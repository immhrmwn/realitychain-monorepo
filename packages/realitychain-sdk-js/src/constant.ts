export interface ContractConfig {
  networkId: string;
  nodeUrl: string;
  walletUrl: string;
  appName: string;
  contractName: string;
}

// tslint:disable-next-line
export interface Nep141Config extends ContractConfig {}
// tslint:disable-next-line
export interface RcParcelsConfig extends ContractConfig {}
// tslint:disable-next-line
export interface RcVouchersConfig extends ContractConfig {}

export const testnetNep141Config: Nep141Config = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  appName: 'Reality Chain Testnet',
  contractName: `bdf09d53af7df6266796b20e15e123acf491fe7a.factory.goerli.testnet`,
};

export const rcParcelsTestnetConfig: RcParcelsConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  appName: 'Reality Chain Testnet',
  contractName: `rc-parcels.testnet`,
};

export const rcParcelsMainnetConfig: RcParcelsConfig = {
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.mainnet.near.org',
  appName: 'Reality Chain Mainnet',
  contractName: `rc-parcels.near`,
};

export const rcVouchersTestnetConfig: RcVouchersConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  appName: 'Reality Chain Testnet',
  contractName: `rc-vouchers.testnet`,
};

export const rcVouchersMainnetConfig: RcVouchersConfig = {
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.mainnet.near.org',
  appName: 'Reality Chain Mainnet',
  contractName: `rc-vouchers.near`,
};

export const oneYoctoNear: string = '1';
