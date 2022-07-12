import * as nearAPI from 'near-api-js';
import { NftCreateSeriesDto, TokenSeriesJson } from './interfaces';

export async function nftCreateSeries(
  contract: nearAPI.Contract,
  args: NftCreateSeriesDto,
  gas: number = 300000000000000,
  amount: string = '8540000000000000000000',
): Promise<TokenSeriesJson> {
  return (await (contract as any).nft_create_series({
    args,
    gas, //	attached GAS
    amount,
  })) as TokenSeriesJson;
}
