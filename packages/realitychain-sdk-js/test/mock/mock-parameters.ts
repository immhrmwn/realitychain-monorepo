import { NftCreateSeriesDto, NftMintDto } from '../../src/interfaces';

export const accountId = 'agustinustheo.testnet';

export const nftCreateSeriesParams: NftCreateSeriesDto = {
  token_metadata: {
    title: 'Dark',
    media: 'bafybeifdbvb6yzajogbe4dbn3bgxoli3sp7ol7upfmu2givpvbwufydthu',
    reference: 'bafybeifvzitvju4ftwnkf7w7yakz7i5colcey223uk2ui4t5z3ss7l2od4',
    copies: 100,
    issued_at: '',
    description: null,
    media_hash: null,
    expires_at: null,
    starts_at: null,
    updated_at: null,
    extra: null,
    reference_hash: null,
  },
  price: null,
  royalty: {
    [accountId]: 1000,
  },
};

export function createNftMintParams(tokenSeriesId: string): NftMintDto {
  return {
    token_series_id: tokenSeriesId,
    receiver_id: accountId,
  };
}
