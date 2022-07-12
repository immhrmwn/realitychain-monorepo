import * as nearAPI from 'near-api-js';
import { contractConfig } from './constant';

export async function createNearConnection(
  keyStore: nearAPI.keyStores.KeyStore,
  config: contractConfig,
): Promise<nearAPI.Near> {
  return await nearAPI.connect({
    headers: {},
    deps: {
      keyStore: keyStore,
    },
    ...config,
  });
}

export async function useAccount(connection: nearAPI.Near, accountId: string): Promise<nearAPI.Account> {
  return await connection.account(accountId);
}

export async function realityChainContractWithAccountId(
  accountId: string,
  keyStore: nearAPI.keyStores.KeyStore,
  config: contractConfig,
): Promise<nearAPI.Contract> {
  const connection = await createNearConnection(keyStore, config);
  const account = await useAccount(connection, accountId);

  return await new nearAPI.Contract(account, config.contractName, {
    viewMethods: ['nft_get_series_single'],
    changeMethods: ['nft_create_series'],
  });
}
