import {
  rcParcelsTestnetConfig,
  rcParcelsMainnetConfig,
  rcVouchersTestnetConfig,
  rcVouchersMainnetConfig,
  testnetNep141Config,
} from "@realitychain/sdk";

export function getParcelsConfig(env) {
  switch (env) {
    case "production":
    case "mainnet":
      return rcParcelsMainnetConfig;
    case "development":
    case "testnet":
      return rcParcelsTestnetConfig;
    default:
      throw Error(
        `Unconfigured environment '${env}'. Can be configured in src/config.js.`
      );
  }
}

export function getVouchersConfig(env) {
  switch (env) {
    case "production":
    case "mainnet":
      return rcVouchersMainnetConfig;
    case "development":
    case "testnet":
      return rcVouchersTestnetConfig;
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
