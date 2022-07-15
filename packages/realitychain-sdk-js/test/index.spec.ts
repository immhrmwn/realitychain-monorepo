import { keyStores } from 'near-api-js';
import { rcParcelsTestnetConfig } from '../src/constant';
import { parcelsContractWithAccountId } from '../src/near-api';
import {
  nftBuy,
  nftCreateSeries,
  nftDecreaseSeriesCopies,
  nftMint,
  nftSetSeriesNonMintable,
} from '../src/change-methods';
import { nftGetSeriesSingle, nftToken } from '../src/view-methods';
import {
  accountId,
  createNftBuyParams,
  createNftDecreaseSeriesCopiesParams,
  createNftMintParams,
  nftCreateSeriesParams,
  nftCreateSeriesWithPriceParams,
  nullNftCreateSeriesParams,
  oneNftCreateSeriesParams,
  twoNftCreateSeriesParams,
} from './mock/mock-parameters';
import { TokenSeriesIdDto } from '../src/interfaces';

describe('Contract Tests', () => {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  it('nft create series should return', async () => {
    // Arrange
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await parcelsContractWithAccountId(accountId, keyStore, rcParcelsTestnetConfig);

    // Act
    const ret = await nftCreateSeries(contract, nftCreateSeriesParams);

    // Assert
    expect(ret.metadata.title).toEqual(nftCreateSeriesParams.metadata.token_metadata.title);
    expect(ret.metadata.media).toEqual(nftCreateSeriesParams.metadata.token_metadata.media);
    expect(ret.metadata.reference).toEqual(nftCreateSeriesParams.metadata.token_metadata.reference);
    expect(ret.royalty).toEqual(nftCreateSeriesParams.royalty);
  }, 60000);

  it('nft get series single should return', async () => {
    // Arrange
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await parcelsContractWithAccountId(accountId, keyStore, rcParcelsTestnetConfig);

    // Act
    const ret = await nftGetSeriesSingle(contract, '2');

    // Assert
    expect(ret.metadata.title).toEqual(nftCreateSeriesParams.metadata.token_metadata.title);
    expect(ret.metadata.media).toEqual(nftCreateSeriesParams.metadata.token_metadata.media);
    expect(ret.metadata.reference).toEqual(nftCreateSeriesParams.metadata.token_metadata.reference);
    expect(ret.royalty).toEqual(nftCreateSeriesParams.royalty);
  }, 60000);

  it('nft buy should return', async () => {
    // Arrange
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await parcelsContractWithAccountId(accountId, keyStore, rcParcelsTestnetConfig);
    const ncs = await nftCreateSeries(contract, nftCreateSeriesWithPriceParams);

    // Act
    const ret = await nftBuy(contract, createNftBuyParams(ncs.token_series_id));
    const token = await nftToken(contract, ret);

    // Assert
    expect(ret).toEqual(`${ncs.token_series_id}:1`);
    expect(token.token_id).toEqual(ret);
    expect(token.metadata.title.includes(nftCreateSeriesWithPriceParams.metadata.token_metadata.title)).toBeTruthy();
    expect(token.metadata.media).toEqual(nftCreateSeriesWithPriceParams.metadata.token_metadata.media);
    expect(token.metadata.reference).toEqual(nftCreateSeriesWithPriceParams.metadata.token_metadata.reference);
  }, 60000);

  it('nft mint should return', async () => {
    // Arrange
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await parcelsContractWithAccountId(accountId, keyStore, rcParcelsTestnetConfig);
    const ncs = await nftCreateSeries(contract, nftCreateSeriesParams);

    // Act
    const ret = await nftMint(contract, createNftMintParams(ncs.token_series_id));
    const token = await nftToken(contract, ret);

    // Assert
    expect(ret).toEqual(`${ncs.token_series_id}:1`);
    expect(token.token_id).toEqual(ret);
    expect(token.metadata.title.includes(nftCreateSeriesParams.metadata.token_metadata.title)).toBeTruthy();
    expect(token.metadata.media).toEqual(nftCreateSeriesParams.metadata.token_metadata.media);
    expect(token.metadata.reference).toEqual(nftCreateSeriesParams.metadata.token_metadata.reference);
  }, 60000);

  it('nft mint should throw non mintable', async () => {
    // Arrange
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await parcelsContractWithAccountId(accountId, keyStore, rcParcelsTestnetConfig);
    const ncs = await nftCreateSeries(contract, nullNftCreateSeriesParams);

    // Act
    await nftSetSeriesNonMintable(contract, { token_series_id: ncs.token_series_id } as TokenSeriesIdDto);

    // Assert
    await expect(nftMint(contract, createNftMintParams(ncs.token_series_id))).rejects.toThrow();
  }, 60000);

  it('nft mint should throw', async () => {
    // Arrange
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await parcelsContractWithAccountId(accountId, keyStore, rcParcelsTestnetConfig);
    const ncs = await nftCreateSeries(contract, oneNftCreateSeriesParams);

    // Act
    await nftMint(contract, createNftMintParams(ncs.token_series_id));

    // Assert
    await expect(nftMint(contract, createNftMintParams(ncs.token_series_id))).rejects.toThrow();
  }, 60000);

  it('nft decrease series copies should return', async () => {
    // Arrange
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await parcelsContractWithAccountId(accountId, keyStore, rcParcelsTestnetConfig);
    const ncs = await nftCreateSeries(contract, nftCreateSeriesParams);

    const ret = await nftMint(contract, createNftMintParams(ncs.token_series_id));
    const token = await nftToken(contract, ret);

    expect(ret).toEqual(`${ncs.token_series_id}:1`);
    expect(token.token_id).toEqual(ret);
    expect(token.metadata.title.includes(nftCreateSeriesParams.metadata.token_metadata.title)).toBeTruthy();
    expect(token.metadata.media).toEqual(nftCreateSeriesParams.metadata.token_metadata.media);
    expect(token.metadata.reference).toEqual(nftCreateSeriesParams.metadata.token_metadata.reference);

    await nftMint(contract, createNftMintParams(ncs.token_series_id));

    // Assert
    await nftDecreaseSeriesCopies(contract, createNftDecreaseSeriesCopiesParams(ncs.token_series_id));
  }, 60000);

  it('nft decrease series copies should throw', async () => {
    // Arrange
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await parcelsContractWithAccountId(accountId, keyStore, rcParcelsTestnetConfig);
    const ncs = await nftCreateSeries(contract, twoNftCreateSeriesParams);

    const ret = await nftMint(contract, createNftMintParams(ncs.token_series_id));
    const token = await nftToken(contract, ret);

    expect(ret).toEqual(`${ncs.token_series_id}:1`);
    expect(token.token_id).toEqual(ret);
    expect(token.metadata.title.includes(twoNftCreateSeriesParams.metadata.token_metadata.title)).toBeTruthy();
    expect(token.metadata.media).toEqual(twoNftCreateSeriesParams.metadata.token_metadata.media);
    expect(token.metadata.reference).toEqual(twoNftCreateSeriesParams.metadata.token_metadata.reference);

    await nftMint(contract, createNftMintParams(ncs.token_series_id));

    // Assert
    await expect(
      nftDecreaseSeriesCopies(contract, createNftDecreaseSeriesCopiesParams(ncs.token_series_id)),
    ).rejects.toThrow();
  }, 60000);
});
