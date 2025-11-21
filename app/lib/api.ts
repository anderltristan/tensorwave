const BASE_URL = 'https://www.alphavantage.co/query';

const API_KEY = process.env.ALPHA_VANTAGE_KEY;

export type CompanyOverview = Record<string, string>;

export type DailySeries = Record<
  string,
  {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
    [key: string]: string;
  }
>;

export async function fetchCompanyOverview(symbol: string): Promise<CompanyOverview> {
  const url = `${BASE_URL}?function=OVERVIEW&symbol=${encodeURIComponent(
    symbol,
  )}&apikey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Overview request failed with status ${res.status}`);
  }
  const data = await res.json();
  return data;
}

export async function fetchDailyTimeSeries(symbol: string): Promise<DailySeries> {
  const url = `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${encodeURIComponent(
    symbol,
  )}&outputsize=compact&apikey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Time series request failed with status ${res.status}`);
  }
  const data = await res.json();

  const series = data['Time Series (Daily)'];
  if (!series || typeof series !== 'object') {
    throw new Error(data['Note'] || data['Error Message'] || 'Time series not available');
  }
  return series as DailySeries;
}
