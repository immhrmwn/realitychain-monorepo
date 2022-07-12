type Nullable<T> = T | null;

export interface TokenMetadata {
  title: string;
  media: string;
  reference: string;
  copies: number;
  issued_at: string;
  description: Nullable<string>;
  media_hash: Nullable<string>;
  expires_at: Nullable<string>;
  starts_at: Nullable<string>;
  updated_at: Nullable<string>;
  extra: Nullable<string>;
  reference_hash: Nullable<string>;
}

export interface Token {
  token_id: string;
  owner_id: string;
  metadata: TokenMetadata;
  approved_account_ids: [x: string];
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

export interface NftBuyDto {
  token_series_id: string;
  receiver_id: string;
}

export interface NftMintDto {
  token_series_id: string;
  receiver_id: string;
}
