import * as nearAPI from 'near-api-js';
import { Base64 } from 'js-base64';

const authToken = async (accountId, signer, networkId) => {
	try {
		const arr = new Array(accountId)
		for (var i = 0; i < accountId.length; i++) {
			arr[i] = accountId.charCodeAt(i)
		}
		const msgBuf = new Uint8Array(arr)
		const signedMsg = await signer.signMessage(
			msgBuf,
			accountId,
			networkId
		)
		const pubKey = Buffer.from(signedMsg.publicKey.data).toString('hex')
		const signature = Buffer.from(signedMsg.signature).toString('hex')
		const payload = [accountId, pubKey, signature]
		return Base64.encode(payload.join('&'))
	} catch (err) {
		console.log(err)
		return null
	}
}

const main = async () => {
	const config = {
		networkId: 'testnet',
		nodeUrl: 'https://rpc.testnet.near.org',
		walletUrl: 'https://wallet.testnet.near.org',
		appName: 'RC Testnet',
		contractName: `agustinustheo.testnet`
	}

    try {
		// Initializing nearAPI
		// Login and init contract
		const keyStore = new nearAPI.keyStores.UnencryptedFileSystemKeyStore(
			`${process.env.HOME}/.near-credentials/`
		)

		const signer = new nearAPI.InMemorySigner(keyStore)

		const connection = await nearAPI.connect({
      headers: {},
			deps: {
				keyStore: keyStore,
			},
			...config,
		})

		const account_id = 'agustinustheo.testnet'
		const account = await connection.account(account_id)
		const authorizationHeader = await authToken(account_id, signer, config.networkId)

		console.log(`Authorization Header : ${authorizationHeader}`)
	} catch (err) {
		throw err
	}

	try {
		// Initializing nearAPI
		// Login and init contract
		const keyStore = new nearAPI.keyStores.UnencryptedFileSystemKeyStore(
			`${process.env.HOME}/.near-credentials/`
		)

		const connection = await nearAPI.connect({
      headers: {},
			deps: {
				keyStore: keyStore,
			},
			...config,
		})

		const account_id = 'agustinustheo.testnet'
		const account = await connection.account(account_id)

		const contract: any = await new nearAPI.Contract(
			account,
			config.contractName,
			{
        viewMethods: [],
				changeMethods: [
					'new_default_meta',
					'nft_create_series'
				],
			}
		)

		await contract.new_default_meta({
			args: {
				owner_id: account_id,
				treasury_id: account_id
			},
			gas: 300000000000000,
        })

		const formattedParams = {
				token_metadata: {
					title: 'Dark',
					media: 'bafybeifdbvb6yzajogbe4dbn3bgxoli3sp7ol7upfmu2givpvbwufydthu',
					reference: 'bafybeifvzitvju4ftwnkf7w7yakz7i5colcey223uk2ui4t5z3ss7l2od4',
					copies: 100 
				},
				price: null,
				royalty: {
					[account_id]: 1000
				}
		}

		const ret = await contract.nft_create_series({
			args: formattedParams,
			gas: 300000000000000, //	attached GAS
			amount: "8540000000000000000000"
        })

		console.log(ret)
	} catch (err) {
		throw err
	}
}

main()