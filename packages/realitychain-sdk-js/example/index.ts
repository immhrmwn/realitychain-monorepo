import { keyStores } from 'near-api-js';
import {
  nftCreateVoucherSeries,
  rcVouchersTestnetConfig,
  vouchersContractWithAccountId,
  NftCreateVoucherSeriesDto,
  nep141ContractWithAccountId,
  testnetNep141Config,
} from '../src';

const main = async () => {
  try {
    const ownerAccountId = 'agustinustheo.testnet';
    const treasuryAccountId = 'rc-vouchers.testnet';
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract = await vouchersContractWithAccountId(ownerAccountId, keyStore, rcVouchersTestnetConfig);
    const ftContract = await nep141ContractWithAccountId(ownerAccountId, keyStore, testnetNep141Config);

    // if (contract.new_default_meta) {
    //   await contract.new_default_meta({
    //     args: {
    //       owner_id: ownerAccountId,
    //       treasury_id: treasuryAccountId,
    //     },
    //     gas: 300000000000000,
    //   });
    // }

    const formattedParams: NftCreateVoucherSeriesDto = {
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
        [ownerAccountId]: 1000,
      },
    };

    // const ret = await nftCreateVoucherSeries(contract, formattedParams);

    // console.log(ret);

    const ret = await ftContract.storage_deposit({
      args: {
        account_id: 'rc-vouchers.testnet',
        registration_only: null,
      },
      gas: 300000000000000,
      amount: '7090000000000000000000',
    });

    console.log(ret);

    const ret2 = await ftContract.ft_transfer_call({
      args: {
        receiver_id: 'rc-vouchers.testnet',
        amount: '10000000000000',
        msg: '{ "token_series_id": "1" }',
      },
      gas: 300000000000000,
      amount: '1',
    });

    console.log(ret2);
  } catch (err) {
    throw err;
  }
};

main();
