import { keyStores } from 'near-api-js';
import { testnetConfig } from '../src/constant';
import { realityChainContractWithAccountId } from '../src/near-api';
import { nftCreateSeries } from '../src/change-methods';
import { nftGetSeriesSingle } from '../src/view-methods';
import { accountId, formattedParams } from './mock/mock-parameters';

describe('Contract Tests', () => {
  it('nft create series should return', async () => {
    // Arrange
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await realityChainContractWithAccountId(accountId, keyStore, testnetConfig);

    // Act
    const ret = await nftCreateSeries(contract, formattedParams);

    // Assert
    expect(ret.metadata.title).toEqual(formattedParams.token_metadata.title);
    expect(ret.metadata.media).toEqual(formattedParams.token_metadata.media);
    expect(ret.metadata.reference).toEqual(formattedParams.token_metadata.reference);
    expect(ret.royalty).toEqual(formattedParams.royalty);
  }, 60000);

  it('nft get series single should return', async () => {
    // Arrange
    const accountId = 'agustinustheo.testnet';
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await realityChainContractWithAccountId(accountId, keyStore, testnetConfig);

    // Act
    const ret = await nftGetSeriesSingle(contract, '2');

    // Assert
    expect(ret.metadata.title).toEqual(formattedParams.token_metadata.title);
    expect(ret.metadata.media).toEqual(formattedParams.token_metadata.media);
    expect(ret.metadata.reference).toEqual(formattedParams.token_metadata.reference);
    expect(ret.royalty).toEqual(formattedParams.royalty);
  }, 60000);
});
