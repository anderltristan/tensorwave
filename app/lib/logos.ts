const SYMBOL_TO_DOMAIN: Record<string, string> = {
    AAPL: 'apple.com',
    MSFT: 'microsoft.com',
    GOOGL: 'abc.xyz',
    AMZN: 'amazon.com',
    META: 'meta.com',
    TSLA: 'tesla.com',
    NVDA: 'nvidia.com',
    NFLX: 'netflix.com',
    IBM: 'ibm.com',
    ORCL: 'oracle.com',
    INTC: 'intel.com',
    ADBE: 'adobe.com',
    CRM: 'salesforce.com',
    SHOP: 'shopify.com',
    SQ: 'block.xyz',
};

export function getLogoUrl(symbol: string): string | null {
    const domain = SYMBOL_TO_DOMAIN[symbol.toUpperCase()];
    if (!domain) return null;
    return `https://logo.clearbit.com/${domain}`;
}
