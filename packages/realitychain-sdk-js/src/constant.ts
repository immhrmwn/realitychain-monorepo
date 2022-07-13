export interface ContractConfig {
  networkId: string;
  nodeUrl: string;
  walletUrl: string;
  appName: string;
  contractName: string;
}
export const testnetNep141Config: ContractConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  appName: 'Reality Chain Testnet',
  contractName: `bdf09d53af7df6266796b20e15e123acf491fe7a.factory.goerli.testnet`,
};

export const testnetConfig: ContractConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  appName: 'Reality Chain Testnet',
  contractName: `agustinustheo.testnet`,
};

export const mainnetConfig: ContractConfig = {
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.mainnet.near.org',
  appName: 'Reality Chain Mainnet',
  contractName: `agustinustheo.near`,
};

export const oneYoctoNear: string = '1';
