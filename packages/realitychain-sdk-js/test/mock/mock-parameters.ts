import { NftCreateSeriesDto } from '../../src/interfaces';

export const accountId = 'agustinustheo.testnet';

export const formattedParams: NftCreateSeriesDto = {
  token_metadata: {
    title: 'Dark',
    media: 'bafybeifdbvb6yzajogbe4dbn3bgxoli3sp7ol7upfmu2givpvbwufydthu',
    reference: 'bafybeifvzitvju4ftwnkf7w7yakz7i5colcey223uk2ui4t5z3ss7l2od4',
    copies: 100,
  },
  price: null,
  royalty: {
    [accountId]: 1000,
  },
};
