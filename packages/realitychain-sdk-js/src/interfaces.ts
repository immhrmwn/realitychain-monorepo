import { Contract } from 'near-api-js';

export interface TokenMetadata {
  title: string | null;
  media: string | null;
  reference: string | null;
  issued_at: string | null;
  copies: number | null;
  description: string | null;
  media_hash: string | null;
  expires_at: string | null;
  starts_at: string | null;
  updated_at: string | null;
  extra: string | null;
  reference_hash: string | null;
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

export interface TokenSeriesIdDto {
  token_series_id: string;
}

export interface NftDecreaseSeriesCopiesDto {
  token_series_id: string;
  decrease_copies: string;
}

export interface NftBuyDto {
  token_series_id: string;
  receiver_id: string;
}

export interface NftMintDto {
  token_series_id: string;
  receiver_id: string;
}

export interface FtStakeAndNftMintDto {
  receiver_id: string;
  amount: string;
  token_series_id: string;
}

export interface Nep141Contract extends Contract {
  ft_balance_of;
}

export interface RcParcelsContract extends Contract {
  nft_create_series;
  nft_buy;
  nft_mint;
  nft_decrease_series_copies;
  nft_set_series_non_mintable;
  nft_set_series_price;
  nft_get_series_single;
  nft_token;
}

export interface RcVouchersContract extends Contract {
  nft_create_series;
  ft_stake_and_nft_mint;
  nft_decrease_series_copies;
  nft_set_series_price;
  nft_get_series_single;
  nft_token;
}
