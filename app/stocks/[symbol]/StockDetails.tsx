'use client';

import * as React from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  GridLegacy as Grid,
} from '@mui/material';
import {
  CompanyOverview,
  DailySeries,
  fetchCompanyOverview,
  fetchDailyTimeSeries,
} from '../../lib/api';

type PriceRow = {
  date: string;
  close: number;
  volume: number;
  percentChange: number | null;
};

type Props = {
  symbol: string;
};

function buildPriceRows(series: DailySeries): PriceRow[] {
  const entries = Object.entries(series);

  entries.sort(([d1], [d2]) => (d1 < d2 ? -1 : d1 > d2 ? 1 : 0));

  let prevClose: number | null = null;

  return entries.map(([date, daily]) => {
    const close = parseFloat(daily['4. close']);
    const volume = parseInt(daily['5. volume'], 10);
    const percentChange =
      prevClose != null ? ((close - prevClose) / prevClose) * 100 : null;

    prevClose = close;

    return { date, close, volume, percentChange };
  });
}

function safeField(overview: CompanyOverview | null, key: string): string {
  if (!overview) return 'N/A';
  const v = overview[key];
  return v && v.trim().length > 0 ? v : 'N/A';
}

export function StockDetails({ symbol }: Props) {
  const [overview, setOverview] = React.useState<CompanyOverview | null>(null);
  const [prices, setPrices] = React.useState<PriceRow[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const [ov, series] = await Promise.all([
          fetchCompanyOverview(symbol),
          fetchDailyTimeSeries(symbol),
        ]);

        if (cancelled) return;

        setOverview(ov);
        setPrices(buildPriceRows(series));
      } catch (e: any) {
        if (cancelled) return;
        console.error(e);
        setError(e?.message || 'Failed to load data');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [symbol]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {symbol} – {safeField(overview, 'Name')}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Company Overview
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box component="dl" sx={{ m: 0 }}>
                <Typography component="dt" variant="body2" fontWeight="bold">
                  Symbol
                </Typography>
                <Typography component="dd" variant="body2" mb={1}>
                  {symbol}
                </Typography>

                <Typography component="dt" variant="body2" fontWeight="bold">
                  Asset Type
                </Typography>
                <Typography component="dd" variant="body2" mb={1}>
                  {safeField(overview, 'AssetType')}
                </Typography>

                <Typography component="dt" variant="body2" fontWeight="bold">
                  Exchange
                </Typography>
                <Typography component="dd" variant="body2" mb={1}>
                  {safeField(overview, 'Exchange')}
                </Typography>

                <Typography component="dt" variant="body2" fontWeight="bold">
                  Sector
                </Typography>
                <Typography component="dd" variant="body2" mb={1}>
                  {safeField(overview, 'Sector')}
                </Typography>

                <Typography component="dt" variant="body2" fontWeight="bold">
                  Industry
                </Typography>
                <Typography component="dd" variant="body2" mb={1}>
                  {safeField(overview, 'Industry')}
                </Typography>

                <Typography component="dt" variant="body2" fontWeight="bold">
                  Market Cap
                </Typography>
                <Typography component="dd" variant="body2" mb={1}>
                  {safeField(overview, 'MarketCapitalization')}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, maxHeight: 260, overflow: 'auto' }}>
              <Typography variant="body2">
                {safeField(overview, 'Description')}
              </Typography>
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Typography variant="h6" gutterBottom>
            Historical Daily Prices
          </Typography>
          <Paper variant="outlined" sx={{ maxHeight: 500, overflow: 'auto' }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Close</TableCell>
                  <TableCell align="right">Volume</TableCell>
                  <TableCell align="right">% Change</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prices.map((row) => (
                  <TableRow key={row.date}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell align="right">{row.close.toFixed(2)}</TableCell>
                    <TableCell align="right">
                      {row.volume.toLocaleString()}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color:
                          row.percentChange == null
                            ? 'inherit'
                            : row.percentChange > 0
                            ? 'success.main'
                            : row.percentChange < 0
                            ? 'error.main'
                            : 'inherit',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {row.percentChange == null
                        ? '—'
                        : `${row.percentChange > 0 ? '+' : ''}${row.percentChange.toFixed(
                            2,
                          )}%`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
