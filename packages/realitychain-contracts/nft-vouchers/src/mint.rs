use crate::*;
use near_sdk::{env, ext_contract, near_bindgen, AccountId};

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

#[ext_contract(ext_ft)]
trait FungibleToken {
    // change methods
    fn ft_transfer(&mut self, receiver_id: AccountId, amount: U128, memo: Option<String>);
}

const GAS_FOR_CALLBACK: Gas = 5_000_000_000_000;

#[near_bindgen]
impl RealityParcelVouchersContract {
    #[payable]
    pub fn ft_stake_and_nft_mint(
        &mut self,
        receiver_id: AccountId,
        amount: U128,
        token_series_id: String,
    ) -> TokenId {
        ext_ft::ft_transfer(
            receiver_id,
            amount,
            None,
            &env::current_account_id().to_string(),
            0, // amount of yoctoNEAR to attach
            GAS_FOR_CALLBACK,
        );

        let initial_storage_usage = env::storage_usage();
        let sender_id = env::predecessor_account_id();

        let _token_series = self
            .token_series_by_id
            .get(&token_series_id)
            .expect("RealityChain: Token series not exist");

        let token_id: TokenId = self.nft_mint_series(token_series_id, sender_id.to_string());

        refund_deposit(env::storage_usage() - initial_storage_usage, 0);

        NearEvent::log_nft_mint(sender_id.to_string(), vec![token_id.clone()], None);

        token_id
    }

    #[private]
    fn nft_mint_series(
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
}
