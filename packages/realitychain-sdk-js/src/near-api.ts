import * as nearAPI from 'near-api-js';
import { ContractConfig } from './constant';

export async function createNearConnection(
  keyStore: nearAPI.keyStores.KeyStore,
  config: ContractConfig,
): Promise<nearAPI.Near> {
  return await nearAPI.connect({
    headers: {},
    deps: {
      keyStore,
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
  config: ContractConfig,
): Promise<nearAPI.Contract> {
  const connection = await createNearConnection(keyStore, config);
  const account = await useAccount(connection, accountId);

  return await new nearAPI.Contract(account, config.contractName, {
    viewMethods: ['nft_get_series_single', 'nft_token'],
    changeMethods: [
      'nft_create_series',
      'nft_buy',
      'nft_mint',
      'nft_decrease_series_copies',
      'nft_set_series_non_mintable',
      'nft_set_series_price',
    ],
  });
}

export async function nep141ContractWithAccountId(
  accountId: string,
  keyStore: nearAPI.keyStores.KeyStore,
  config: ContractConfig,
): Promise<nearAPI.Contract> {
  const connection = await createNearConnection(keyStore, config);
  const account = await useAccount(connection, accountId);

  return await new nearAPI.Contract(account, config.contractName, {
    viewMethods: ['ft_balance_of'],
    changeMethods: [],
  });
}
