'use client';

import {
  Card,
  CardActionArea,
  CardContent,
  GridLegacy as Grid,
  Typography,
  Box,
} from '@mui/material';
import Link from 'next/link';

type Ticker = {
  symbol: string;
  name: string;
};

const TICKERS: Ticker[] = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc. (Class A)' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.' },
  { symbol: 'META', name: 'Meta Platforms, Inc.' },
  { symbol: 'TSLA', name: 'Tesla, Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'NFLX', name: 'Netflix, Inc.' },
  { symbol: 'IBM', name: 'International Business Machines' },
  { symbol: 'ORCL', name: 'Oracle Corporation' },
  { symbol: 'INTC', name: 'Intel Corporation' },
  { symbol: 'ADBE', name: 'Adobe Inc.' },
  { symbol: 'CRM', name: 'Salesforce, Inc.' },
  { symbol: 'SHOP', name: 'Shopify Inc.' },
  { symbol: 'SQ', name: 'Block, Inc.' },
];

export default function HomePage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Stocks
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Select a stock to view company overview and daily price history.
      </Typography>
      <Grid container spacing={2} mt={1}>
        {TICKERS.map((ticker) => (
          <Grid item xs={12} sm={6} md={4} key={ticker.symbol}>
            <Card variant="outlined">
              <Link
                href={`/stocks/${ticker.symbol}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6">{ticker.symbol}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ticker.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
