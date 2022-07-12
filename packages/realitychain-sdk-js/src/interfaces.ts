export interface TokenMetadata {
  title: string;
  media: string;
  reference: string;
  copies: number;
}

export interface Royalty {
  [x: string]: number;
}

export interface NftCreateSeriesDto {
  token_metadata: TokenMetadata;
  price: any;
  royalty: Royalty;
}

export interface TokenSeriesJson {
  token_series_id: string;
  metadata: TokenMetadata;
  creator_id: string;
  royalty: Royalty;
  transaction_fee: string;
}
