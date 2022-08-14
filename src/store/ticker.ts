export interface UnhandledTicker {
  baseVolume: string;
  high24hr: string;
  highestBid: string;
  id: number;
  isFrozen: string;
  last: string;
  low24hr: string;
  lowestAsk: string;
  percentChange: string;
  quoteVolume: string;
}

export interface HandledTicker extends UnhandledTicker {
  ticker: string;
  isAsc: boolean;
  isDesc: boolean;
}

export interface ErrorResponse {
  error: string;
}

export type CorrectResponse = Record<string, UnhandledTicker>;

export type ServerResponse = CorrectResponse | ErrorResponse;
