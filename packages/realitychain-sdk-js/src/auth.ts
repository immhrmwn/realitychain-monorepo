import { InMemorySigner } from 'near-api-js';
import { Base64 } from 'js-base64';

export async function generateAuthToken(accountId: string, signer: InMemorySigner, networkId: string) {
  const arr: any[] = new Array(accountId);
  for (let i = 0; i < accountId.length; i++) {
    arr[i] = accountId.charCodeAt(i);
  }
  const msgBuf = new Uint8Array(arr);
  const signedMsg = await signer.signMessage(msgBuf, accountId, networkId);
  const pubKey = Buffer.from(signedMsg.publicKey.data).toString('hex');
  const signature = Buffer.from(signedMsg.signature).toString('hex');
  const payload = [accountId, pubKey, signature];
  return Base64.encode(payload.join('&'));
}
