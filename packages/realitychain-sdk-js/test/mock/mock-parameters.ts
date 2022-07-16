import { NftBuyDto, NftCreateParcelSeriesDto, NftDecreaseSeriesCopiesDto, NftMintDto } from '../../src/interfaces';

export const accountId = 'agustinustheo.testnet';

export const nftCreateSeriesParams: NftCreateParcelSeriesDto = {
  parcel_metadata: {
    world_id: 'world_id',
    land_id: 'land_id',
    land_x: 0,
    land_y: 0,
    land_size: 0,
  },
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

export const nullNftCreateSeriesParams: NftCreateParcelSeriesDto = {
  parcel_metadata: {
    world_id: 'world_id',
    land_id: 'land_id',
    land_x: 0,
    land_y: 0,
    land_size: 0,
  },
  token_metadata: {
    title: 'Dark',
    media: 'bafybeifdbvb6yzajogbe4dbn3bgxoli3sp7ol7upfmu2givpvbwufydthu',
    reference: 'bafybeifvzitvju4ftwnkf7w7yakz7i5colcey223uk2ui4t5z3ss7l2od4',
    copies: null,
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

export const oneNftCreateSeriesParams: NftCreateParcelSeriesDto = {
  parcel_metadata: {
    world_id: 'world_id',
    land_id: 'land_id',
    land_x: 0,
    land_y: 0,
    land_size: 0,
  },
  token_metadata: {
    title: 'Dark',
    media: 'bafybeifdbvb6yzajogbe4dbn3bgxoli3sp7ol7upfmu2givpvbwufydthu',
    reference: 'bafybeifvzitvju4ftwnkf7w7yakz7i5colcey223uk2ui4t5z3ss7l2od4',
    copies: 1,
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

export const twoNftCreateSeriesParams: NftCreateParcelSeriesDto = {
  parcel_metadata: {
    world_id: 'world_id',
    land_id: 'land_id',
    land_x: 0,
    land_y: 0,
    land_size: 0,
  },
  token_metadata: {
    title: 'Dark',
    media: 'bafybeifdbvb6yzajogbe4dbn3bgxoli3sp7ol7upfmu2givpvbwufydthu',
    reference: 'bafybeifvzitvju4ftwnkf7w7yakz7i5colcey223uk2ui4t5z3ss7l2od4',
    copies: 2,
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

export const nftCreateSeriesWithPriceParams: NftCreateParcelSeriesDto = {
  parcel_metadata: {
    world_id: 'world_id',
    land_id: 'land_id',
    land_x: 0,
    land_y: 0,
    land_size: 0,
  },
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
  price: '10000000000000000',
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

export function createNftBuyParams(tokenSeriesId: string): NftBuyDto {
  return {
    token_series_id: tokenSeriesId,
    receiver_id: accountId,
  };
}

export function createNftDecreaseSeriesCopiesParams(tokenSeriesId: string): NftDecreaseSeriesCopiesDto {
  return {
    token_series_id: tokenSeriesId,
    decrease_copies: '3',
  };
}
