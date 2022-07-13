import { testnetConfig, mainnetConfig, testnetNep141Config } from "@realitychain/sdk";

export function getConfig(env) {
  switch (env) {
    case "production":
    case "mainnet":
      return mainnetConfig;
    case "development":
    case "testnet":
      return testnetConfig;
    default:
      throw Error(
        `Unconfigured environment '${env}'. Can be configured in src/config.js.`
      );
  }
}

export function getNep141Config(env) {
  switch (env) {
    case "development":
    case "testnet":
      return testnetNep141Config;
    default:
      throw Error(
        `Unconfigured environment '${env}'. Can be configured in src/config.js.`
      );
  }
}
