import { Contract } from 'near-api-js';
import { oneYoctoNear } from './constant';
import {
  NftBuyDto,
  NftCreateSeriesDto,
  NftDecreaseSeriesCopiesDto,
  NftMintDto,
  TokenSeriesIdDto,
  TokenSeriesJson,
} from './interfaces';

export async function nftCreateSeries(
  contract: Contract,
  args: NftCreateSeriesDto,
  gas: number = 300000000000000,
  amount: string = '7090000000000000000000',
): Promise<TokenSeriesJson> {
  return (await (contract as any).nft_create_series({
    args,
    gas,
    amount,
  })) as TokenSeriesJson;
}

export async function nftSetSeriesNonMintable(
  contract: Contract,
  args: TokenSeriesIdDto,
  gas: number = 300000000000000,
): Promise<TokenSeriesJson> {
  return (await (contract as any).nft_set_series_non_mintable({
    args,
    gas,
    amount: oneYoctoNear,
  })) as TokenSeriesJson;
}

export async function nftBuy(
  contract: Contract,
  args: NftBuyDto,
  gas: number = 300000000000000,
  amount: string = '7090000000000000000000',
): Promise<any> {
  return (await (contract as any).nft_buy({
    args,
    gas,
    amount,
  })) as any;
}

export async function nftMint(
  contract: Contract,
  args: NftMintDto,
  gas: number = 300000000000000,
  amount: string = '7090000000000000000000',
): Promise<any> {
  return (await (contract as any).nft_mint({
    args,
    gas,
    amount,
  })) as any;
}

export async function nftDecreaseSeriesCopies(
  contract: Contract,
  args: NftDecreaseSeriesCopiesDto,
  gas: number = 300000000000000,
): Promise<any> {
  return (await (contract as any).nft_decrease_series_copies({
    args,
    gas,
    amount: oneYoctoNear,
  })) as any;
}
