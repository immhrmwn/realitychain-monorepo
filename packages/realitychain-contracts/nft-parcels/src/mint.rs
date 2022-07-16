use crate::*;
use near_sdk::{
    assert_one_yocto, env, ext_contract, near_bindgen, serde_json::json, AccountId, Promise,
};

#[ext_contract(ext_approval_receiver)]
pub trait NonFungibleTokenReceiver {
    fn nft_on_approve(
        &mut self,
        token_id: TokenId,
        owner_id: AccountId,
        approval_id: u64,
        msg: String,
    );
}

#[near_bindgen]
impl RealityParcelsContract {
    #[payable]
    pub fn nft_mint(
        &mut self,
        token_series_id: TokenSeriesId,
        receiver_id: ValidAccountId,
    ) -> TokenId {
        let initial_storage_usage = env::storage_usage();

        let token_series = self
            .token_series_by_id
            .get(&token_series_id)
            .expect("RealityChain: Token series not exist");
        assert_eq!(
            env::predecessor_account_id(),
            token_series.creator_id,
            "RealityChain: not creator"
        );
        let token_id: TokenId = self._nft_mint_series(token_series_id, receiver_id.to_string());

        refund_deposit(env::storage_usage() - initial_storage_usage, 0);

        NearEvent::log_nft_mint(receiver_id.to_string(), vec![token_id.clone()], None);

        token_id
    }

    #[payable]
    pub fn nft_mint_and_approve(
        &mut self,
        token_series_id: TokenSeriesId,
        account_id: ValidAccountId,
        msg: Option<String>,
    ) -> Option<Promise> {
        let initial_storage_usage = env::storage_usage();

        let token_series = self
            .token_series_by_id
            .get(&token_series_id)
            .expect("RealityChain: Token series not exist");
        assert_eq!(
            env::predecessor_account_id(),
            token_series.creator_id,
            "RealityChain: not creator"
        );
        let token_id: TokenId =
            self._nft_mint_series(token_series_id, token_series.creator_id.clone());

        // Need to copy the nft_approve code here to solve the gas problem
        // get contract-level LookupMap of token_id to approvals HashMap
        let approvals_by_id = self.tokens.approvals_by_id.as_mut().unwrap();

        // update HashMap of approvals for this token
        let approved_account_ids = &mut approvals_by_id.get(&token_id).unwrap_or_default();
        let account_id: AccountId = account_id.into();
        let approval_id: u64 = self
            .tokens
            .next_approval_id_by_id
            .as_ref()
            .unwrap()
            .get(&token_id)
            .unwrap_or(1u64);
        approved_account_ids.insert(account_id.clone(), approval_id);

        // save updated approvals HashMap to contract's LookupMap
        approvals_by_id.insert(&token_id, approved_account_ids);

        // increment next_approval_id for this token
        self.tokens
            .next_approval_id_by_id
            .as_mut()
            .unwrap()
            .insert(&token_id, &(approval_id + 1));

        refund_deposit(env::storage_usage() - initial_storage_usage, 0);

        NearEvent::log_nft_mint(
            token_series.creator_id.clone(),
            vec![token_id.clone()],
            None,
        );

        if let Some(msg) = msg {
            Some(ext_approval_receiver::nft_on_approve(
                token_id,
                token_series.creator_id,
                approval_id,
                msg,
                &account_id,
                NO_DEPOSIT,
                env::prepaid_gas() - GAS_FOR_NFT_APPROVE - GAS_FOR_MINT,
            ))
        } else {
            None
        }
    }

    #[payable]
    pub fn nft_buy(
        &mut self,
        token_series_id: TokenSeriesId,
        receiver_id: ValidAccountId,
    ) -> TokenId {
        let initial_storage_usage = env::storage_usage();

        let token_series = self
            .token_series_by_id
            .get(&token_series_id)
            .expect("RealityChain: Token series not exist");
        let price: u128 = token_series.price.expect("RealityChain: not for sale");
        let attached_deposit = env::attached_deposit();
        assert!(
            attached_deposit >= price,
            "RealityChain: attached deposit is less than price : {}",
            price
        );
        let token_id: TokenId =
            self._nft_mint_series(token_series_id.clone(), receiver_id.to_string());

        let for_treasury = price as u128
            * self.calculate_market_data_transaction_fee(&token_series_id)
            / 10_000u128;
        let price_deducted = price - for_treasury;
        Promise::new(token_series.creator_id).transfer(price_deducted);

        if for_treasury != 0 {
            Promise::new(self.treasury_id.clone()).transfer(for_treasury);
        }

        refund_deposit(env::storage_usage() - initial_storage_usage, price);

        NearEvent::log_nft_mint(
            receiver_id.to_string(),
            vec![token_id.clone()],
            Some(json!({"price": price.to_string()}).to_string()),
        );

        token_id
    }

    fn _nft_mint_series(
        &mut self,
        token_series_id: TokenSeriesId,
        receiver_id: AccountId,
    ) -> TokenId {
        let mut token_series = self
            .token_series_by_id
            .get(&token_series_id)
            .expect("RealityChain: Token series not exist");
        assert!(
            token_series.is_mintable,
            "RealityChain: Token series is not mintable"
        );

        let num_tokens = token_series.tokens.len();
        let max_copies = token_series.metadata.copies.unwrap_or(u64::MAX);
        assert!(num_tokens < max_copies, "Series supply maxed");

        if (num_tokens + 1) >= max_copies {
            token_series.is_mintable = false;
        }

        let token_id = format!("{}{}{}", &token_series_id, TOKEN_DELIMETER, num_tokens + 1);
        token_series.tokens.insert(&token_id);
        self.token_series_by_id
            .insert(&token_series_id, &token_series);

        // you can add custom metadata to each token here
        let metadata = Some(TokenMetadata {
            title: None,       // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
            description: None, // free-form description
            media: None, // URL to associated media, preferably to decentralized, content-addressed storage
            media_hash: None, // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
            copies: None, // number of copies of this set of metadata in existence when token was minted.
            issued_at: Some(env::block_timestamp().to_string()), // ISO 8601 datetime when token was issued or minted
            expires_at: None,     // ISO 8601 datetime when token expires
            starts_at: None,      // ISO 8601 datetime when token starts being valid
            updated_at: None,     // ISO 8601 datetime when token was last updated
            extra: None, // anything extra the NFT wants to store on-chain. Can be stringified JSON.
            reference: None, // URL to an off-chain JSON file with more info.
            reference_hash: None, // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
        });

        //let token = self.tokens.mint(token_id, receiver_id, metadata);
        // From : https://github.com/near/near-sdk-rs/blob/master/near-contract-standards/src/non_fungible_token/core/core_impl.rs#L359
        // This allows lazy minting

        let owner_id: AccountId = receiver_id;
        self.tokens.owner_by_id.insert(&token_id, &owner_id);

        self.tokens
            .token_metadata_by_id
            .as_mut()
            .and_then(|by_id| by_id.insert(&token_id, metadata.as_ref().unwrap()));

        if let Some(tokens_per_owner) = &mut self.tokens.tokens_per_owner {
            let mut token_ids = tokens_per_owner.get(&owner_id).unwrap_or_else(|| {
                UnorderedSet::new(StorageKey::TokensPerOwner {
                    account_hash: env::sha256(owner_id.as_bytes()),
                })
            });
            token_ids.insert(&token_id);
            tokens_per_owner.insert(&owner_id, &token_ids);
        }

        token_id
    }

    #[payable]
    pub fn nft_set_series_non_mintable(&mut self, token_series_id: TokenSeriesId) {
        assert_one_yocto();

        let mut token_series = self
            .token_series_by_id
            .get(&token_series_id)
            .expect("Token series not exist");
        assert_eq!(
            env::predecessor_account_id(),
            token_series.creator_id,
            "RealityChain: Creator only"
        );

        assert!(
            token_series.is_mintable,
            "RealityChain: already non-mintable"
        );

        assert_eq!(
            token_series.metadata.copies, None,
            "RealityChain: decrease supply if copies not null"
        );

        token_series.is_mintable = false;
        self.token_series_by_id
            .insert(&token_series_id, &token_series);
        env::log(
            json!({
                "type": "nft_set_series_non_mintable",
                "params": {
                    "token_series_id": token_series_id,
                }
            })
            .to_string()
            .as_bytes(),
        );
    }
}
