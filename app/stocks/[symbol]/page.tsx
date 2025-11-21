import * as React from 'react';
import { StockDetails } from './StockDetails';

type PageProps = {
  params: Promise<{
    symbol: string;
  }>;
};

export default async function StockDetailsPage({ params }: PageProps) {
  const { symbol } = await params;

  if (!symbol) {
    return <div>Missing stock symbol in URL.</div>;
  }

  const upper = symbol.toUpperCase();

  return <StockDetails symbol={upper} />;
}
