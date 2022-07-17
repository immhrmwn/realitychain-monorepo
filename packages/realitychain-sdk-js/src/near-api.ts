import { keyStores, Near, connect, Account, Contract } from 'near-api-js';
import { ContractConfig, Nep141Config, RcParcelsConfig, RcVouchersConfig } from './constant';
import { Nep141Contract, RcParcelsContract, RcVouchersContract } from './interfaces';

export async function createNearConnection(keyStore: keyStores.KeyStore, config: ContractConfig): Promise<Near> {
  return await connect({
    headers: {},
    deps: {
      keyStore,
    },
    ...config,
  });
}

export async function useAccount(connection: Near, accountId: string): Promise<Account> {
  return await connection.account(accountId);
}

export async function parcelsContractWithAccountId(
  accountId: string,
  keyStore: keyStores.KeyStore,
  config: RcParcelsConfig,
): Promise<RcParcelsContract> {
  const connection = await createNearConnection(keyStore, config);
  const account = await useAccount(connection, accountId);

  return (await new Contract(account, config.contractName, {
    viewMethods: ['nft_get_series', 'nft_get_series_single', 'nft_token'],
    changeMethods: [
      'nft_create_series',
      'nft_buy',
      'nft_mint',
      'nft_decrease_series_copies',
      'nft_set_series_non_mintable',
      'nft_set_series_price',
    ],
  })) as RcParcelsContract;
}

export async function vouchersContractWithAccountId(
  accountId: string,
  keyStore: keyStores.KeyStore,
  config: RcVouchersConfig,
): Promise<RcVouchersContract> {
  const connection = await createNearConnection(keyStore, config);
  const account = await useAccount(connection, accountId);

  return (await new Contract(account, config.contractName, {
    viewMethods: ['nft_get_series', 'nft_get_series_single', 'nft_token'],
    changeMethods: ['nft_create_series', 'ft_stake_and_nft_mint', 'nft_decrease_series_copies', 'nft_set_series_price'],
  })) as RcVouchersContract;
}

export async function nep141ContractWithAccountId(
  accountId: string,
  keyStore: keyStores.KeyStore,
  config: Nep141Config,
): Promise<Nep141Contract> {
  const connection = await createNearConnection(keyStore, config);
  const account = await useAccount(connection, accountId);

  return (await new Contract(account, config.contractName, {
    viewMethods: ['ft_balance_of'],
    changeMethods: ['ft_transfer_call', 'storage_deposit'],
  })) as Nep141Contract;
}
