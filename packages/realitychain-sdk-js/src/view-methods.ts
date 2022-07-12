import * as nearAPI from 'near-api-js';
import { TokenSeriesJson } from './interfaces';

export async function nftGetSeriesSingle(contract: nearAPI.Contract, tokenSeriesId: string): Promise<TokenSeriesJson> {
  return (await (contract as any).nft_get_series_single({
    token_series_id: tokenSeriesId,
  })) as TokenSeriesJson;
}
