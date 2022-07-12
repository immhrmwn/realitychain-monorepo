export interface ContractConfig {
  networkId: string;
  nodeUrl: string;
  walletUrl: string;
  appName: string;
  contractName: string;
}

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
