import { keyStores } from 'near-api-js';
import { testnetConfig } from '../src/constant';
import { realityChainContractWithAccountId } from '../src/near-api';
import { nftCreateSeries, nftMint } from '../src/change-methods';
import { nftGetSeriesSingle, nftToken } from '../src/view-methods';
import { accountId, createNftMintParams, nftCreateSeriesParams } from './mock/mock-parameters';

describe('Contract Tests', () => {
  it('nft create series should return', async () => {
    // Arrange
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await realityChainContractWithAccountId(accountId, keyStore, testnetConfig);

    // Act
    const ret = await nftCreateSeries(contract, nftCreateSeriesParams);

    // Assert
    expect(ret.metadata.title).toEqual(nftCreateSeriesParams.token_metadata.title);
    expect(ret.metadata.media).toEqual(nftCreateSeriesParams.token_metadata.media);
    expect(ret.metadata.reference).toEqual(nftCreateSeriesParams.token_metadata.reference);
    expect(ret.royalty).toEqual(nftCreateSeriesParams.royalty);
  }, 60000);

  it('nft get series single should return', async () => {
    // Arrange
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await realityChainContractWithAccountId(accountId, keyStore, testnetConfig);

    // Act
    const ret = await nftGetSeriesSingle(contract, '2');

    // Assert
    expect(ret.metadata.title).toEqual(nftCreateSeriesParams.token_metadata.title);
    expect(ret.metadata.media).toEqual(nftCreateSeriesParams.token_metadata.media);
    expect(ret.metadata.reference).toEqual(nftCreateSeriesParams.token_metadata.reference);
    expect(ret.royalty).toEqual(nftCreateSeriesParams.royalty);
  }, 60000);

  it('nft mint should return', async () => {
    // Arrange
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await realityChainContractWithAccountId(accountId, keyStore, testnetConfig);
    const ncs = await nftCreateSeries(contract, nftCreateSeriesParams);

    // Act
    const ret = await nftMint(contract, createNftMintParams(ncs.token_series_id));
    const token = await nftToken(contract, ret);
    console.log(token);

    // Assert
    expect(ret).toEqual(`${ncs.token_series_id}:1`);
  }, 60000);
});
