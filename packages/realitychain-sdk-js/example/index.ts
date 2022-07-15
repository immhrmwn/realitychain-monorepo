import { keyStores } from 'near-api-js';
import { testnetConfig } from '../src/constant';
import { parcelsContractWithAccountId } from '../src/near-api';
import { NftCreateSeriesDto } from '../src/interfaces';
import { nftCreateSeries } from '../src/change-methods';

const main = async () => {
  try {
    const accountId = 'agustinustheo.testnet';
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await parcelsContractWithAccountId(accountId, keyStore, testnetConfig);

    await contract.new_default_meta({
      args: {
        owner_id: accountId,
        treasury_id: accountId,
      },
      gas: 300000000000000,
    });

    const formattedParams: NftCreateSeriesDto = {
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

    const ret = await nftCreateSeries(contract, formattedParams);

    console.log(ret);
  } catch (err) {
    throw err;
  }
};

main();
