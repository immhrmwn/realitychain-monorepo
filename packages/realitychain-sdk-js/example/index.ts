import { keyStores } from 'near-api-js';
import { rcParcelsTestnetConfig } from '../src/constant';
import { parcelsContractWithAccountId } from '../src/near-api';
import { NftCreateParcelSeriesDto } from '../src/interfaces';
import { nftCreateParcelSeries } from '../src/change-methods';

const main = async () => {
  try {
    const ownerAccountId = 'agustinustheo.testnet';
    const treasuryAccountId = 'rc-parcels.testnet';
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${process.env.HOME}/.near-credentials/`);
    const contract: any = await parcelsContractWithAccountId(ownerAccountId, keyStore, rcParcelsTestnetConfig);

    if (contract.new_default_meta) {
      await contract.new_default_meta({
        args: {
          owner_id: ownerAccountId,
          treasury_id: treasuryAccountId,
        },
        gas: 300000000000000,
      });
    }

    const formattedParams: NftCreateParcelSeriesDto = {
      parcel_metadata: {
        world_id: 'world_id',
        land_id: 'land_id',
        land_size: 0,
        land_x: 0,
        land_y: 0,
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
        [ownerAccountId]: 1000,
      },
    };

    const ret = await nftCreateParcelSeries(contract, formattedParams);

    console.log(ret);
  } catch (err) {
    throw err;
  }
};

main();
