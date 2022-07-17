import * as buffer from "buffer";

import { InMemorySigner, keyStores, WalletConnection } from "near-api-js";
import {
  createNearConnection,
  parcelsContractWithAccountId,
  nep141ContractWithAccountId,
  vouchersContractWithAccountId,
} from "@realitychain/sdk";
import { getParcelsConfig, getVouchersConfig, getNep141Config } from "./config";

const parcelsConfig = getParcelsConfig("development");
const vouchersConfig = getVouchersConfig("development");
const ftConfig = getNep141Config("development");

// Initialize contract & set global variables
export async function initContract() {
  window.Buffer = buffer.Buffer;

  // Initialize connection to the NEAR testnet
  const near = await createNearConnection(
    new keyStores.BrowserLocalStorageKeyStore(),
    parcelsConfig
  );

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId();

  // Initializing our contract APIs by contract name and configuration
  window.parcelsContract = await parcelsContractWithAccountId(
    window.accountId,
    new keyStores.BrowserLocalStorageKeyStore(),
    parcelsConfig
  );

  // Initializing our contract APIs by contract name and configuration
  window.vouchersContract = await vouchersContractWithAccountId(
    window.accountId,
    new keyStores.BrowserLocalStorageKeyStore(),
    vouchersConfig
  );

  // Initializing fungible token contract APIs
  window.ftContract = await nep141ContractWithAccountId(
    window.accountId,
    new keyStores.BrowserLocalStorageKeyStore(),
    ftConfig
  );
}

export function logout() {
  window.walletConnection.signOut();
  // reload page
  window.location.replace(window.location.origin + window.location.pathname);
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.Buffer = buffer.Buffer;
  console.log(parcelsConfig.contractName, 99);
  window.walletConnection.requestSignIn({
    contractId: "agustinustheo.testnet",
    methodNames: [],
  });
  const signer = new InMemorySigner(
    new keyStores.BrowserLocalStorageKeyStore()
  );
  signer.createKey(window.accountId, "testnet");
}
