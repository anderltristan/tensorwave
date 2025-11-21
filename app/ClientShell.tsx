'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from '@mui/material';

const theme = createTheme();

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="div">
              TensorWave Stock Viewer
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box mt={3} mb={4}>
          {children}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
