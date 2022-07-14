use near_contract_standards::non_fungible_token::core::{
    NonFungibleTokenCore, NonFungibleTokenResolver,
};
use near_contract_standards::non_fungible_token::metadata::{
    NFTContractMetadata, NonFungibleTokenMetadataProvider, TokenMetadata, NFT_METADATA_SPEC,
};
use near_contract_standards::non_fungible_token::NonFungibleToken;
use near_contract_standards::non_fungible_token::{Token, TokenId};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LazyOption, UnorderedMap, UnorderedSet};
use near_sdk::env::is_valid_account_id;
use near_sdk::json_types::{ValidAccountId, U128, U64};
use near_sdk::{
    env, ext_contract, near_bindgen, AccountId, Balance, Gas, PanicOnDefault, Promise, Timestamp,
};
use std::collections::HashMap;

mod core;
mod event;
mod metadata;
mod mint;
pub use event::NearEvent;
pub use metadata::StorageKey;

use crate::metadata::{
    MarketDataTransactionFee, Payout, TimestampSec, TokenSeries, TokenSeriesId, TokenSeriesJson,
    TransactionFee,
};

/// between token_series_id and edition number e.g. 42:2 where 42 is series and 2 is edition
pub const TOKEN_DELIMETER: char = ':';
/// TokenMetadata.title returned for individual token e.g. "Title — 2/10" where 10 is max copies
pub const TITLE_DELIMETER: &str = " #";
/// e.g. "Title — 2/10" where 10 is max copies
pub const EDITION_DELIMETER: &str = "/";

const GAS_FOR_RESOLVE_TRANSFER: Gas = 10_000_000_000_000;
const GAS_FOR_NFT_TRANSFER_CALL: Gas = 30_000_000_000_000 + GAS_FOR_RESOLVE_TRANSFER;
const NO_DEPOSIT: Balance = 0;
const MAX_PRICE: Balance = 1_000_000_000 * 10u128.pow(24);

pub type ContractAndTokenId = String;

// near_contract_standards::impl_non_fungible_token_core!(RealityParcelVouchersContract, tokens);
// near_contract_standards::impl_non_fungible_token_enumeration!(RealityParcelVouchersContract, tokens);
near_contract_standards::impl_non_fungible_token_approval!(RealityParcelVouchersContract, tokens);

#[ext_contract(ext_non_fungible_token_receiver)]
trait NonFungibleTokenReceiver {
    /// Returns `true` if the token should be returned back to the sender.
    fn nft_on_transfer(
        &mut self,
        sender_id: AccountId,
        previous_owner_id: AccountId,
        token_id: TokenId,
        msg: String,
    ) -> Promise;
}

#[ext_contract(ext_self)]
trait NonFungibleTokenResolver {
    fn nft_resolve_transfer(
        &mut self,
        previous_owner_id: AccountId,
        receiver_id: AccountId,
        token_id: TokenId,
        approved_account_ids: Option<HashMap<AccountId, u64>>,
    ) -> bool;
}

near_sdk::setup_alloc!();

#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct RealityParcelVouchersContractV1 {
    tokens: NonFungibleToken,
    metadata: LazyOption<NFTContractMetadata>,
    // CUSTOM
    token_series_by_id: UnorderedMap<TokenSeriesId, TokenSeries>,
    owner_id: AccountId,
    treasury_id: AccountId,
    transaction_fee: TransactionFee,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct RealityParcelVouchersContract {
    tokens: NonFungibleToken,
    metadata: LazyOption<NFTContractMetadata>,
    // CUSTOM
    token_series_by_id: UnorderedMap<TokenSeriesId, TokenSeries>,
    owner_id: AccountId,
    treasury_id: AccountId,
    transaction_fee: TransactionFee,
    market_data_transaction_fee: MarketDataTransactionFee,
}

const DATA_IMAGE_SVG_REAL_ICON: &str = "data:image/svg+xml,%3Csvg width='1080' height='1080' viewBox='0 0 1080 1080' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1080' height='1080' rx='10' fill='%230000BA'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M335.238 896.881L240 184L642.381 255.288C659.486 259.781 675.323 263.392 689.906 266.718C744.744 279.224 781.843 287.684 801.905 323.725C827.302 369.032 840 424.795 840 491.014C840 557.55 827.302 613.471 801.905 658.779C776.508 704.087 723.333 726.74 642.381 726.74H468.095L501.429 896.881H335.238ZM387.619 331.329L604.777 369.407C614.008 371.807 622.555 373.736 630.426 375.513C660.02 382.193 680.042 386.712 690.869 405.963C704.575 430.164 711.428 459.95 711.428 495.321C711.428 530.861 704.575 560.731 690.869 584.932C677.163 609.133 648.466 621.234 604.777 621.234H505.578L445.798 616.481L387.619 331.329Z' fill='white'/%3E%3C/svg%3E";

#[near_bindgen]
impl NonFungibleTokenMetadataProvider for RealityParcelVouchersContract {
    fn nft_metadata(&self) -> NFTContractMetadata {
        self.metadata.get().unwrap()
    }
}

#[near_bindgen]
impl NonFungibleTokenResolver for RealityParcelVouchersContract {
    #[private]
    fn nft_resolve_transfer(
        &mut self,
        previous_owner_id: AccountId,
        receiver_id: AccountId,
        token_id: TokenId,
        approved_account_ids: Option<HashMap<AccountId, u64>>,
    ) -> bool {
        let resp: bool = self.tokens.nft_resolve_transfer(
            previous_owner_id.clone(),
            receiver_id.clone(),
            token_id.clone(),
            approved_account_ids,
        );

        // if not successful, return nft back to original owner
        if !resp {
            NearEvent::log_nft_transfer(receiver_id, previous_owner_id, vec![token_id], None, None);
        }

        resp
    }
}

/// from https://github.com/near/near-sdk-rs/blob/e4abb739ff953b06d718037aa1b8ab768db17348/near-contract-standards/src/non_fungible_token/utils.rs#L29

fn refund_deposit(storage_used: u64, extra_spend: Balance) {
    let required_cost = env::storage_byte_cost() * Balance::from(storage_used);
    let attached_deposit = env::attached_deposit() - extra_spend;

    assert!(
        required_cost <= attached_deposit,
        "Must attach {} yoctoNEAR to cover storage",
        required_cost,
    );

    let refund = attached_deposit - required_cost;
    if refund > 1 {
        Promise::new(env::predecessor_account_id()).transfer(refund);
    }
}

fn to_sec(timestamp: Timestamp) -> TimestampSec {
    (timestamp / 10u64.pow(9)) as u32
}

#[cfg(all(test, not(target_arch = "wasm32")))]
mod mock;

#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests {
    use super::*;
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::testing_env;
    use near_sdk::MockedBlockchain;

    use mock::MockContract;
    use near_contract_standards::fungible_token::core::FungibleTokenCore;
    use near_contract_standards::storage_management::StorageManagement;

    const STORAGE_FOR_CREATE_SERIES: Balance = 8540000000000000000000;
    const STORAGE_FOR_MINT: Balance = 11280000000000000000000;

    const TOTAL_SUPPLY: Balance = 1_000_000_000_000_000;

    fn get_context(predecessor_account_id: ValidAccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder
            .current_account_id(accounts(0))
            .signer_account_id(predecessor_account_id.clone())
            .predecessor_account_id(predecessor_account_id);
        builder
    }

    #[test]
    fn test_ft_new() {
        let mut context = get_context(accounts(1));
        testing_env!(context.build());
        let contract = MockContract::new_default_meta(accounts(1).into(), TOTAL_SUPPLY.into());
        testing_env!(context.is_view(true).build());
        assert_eq!(contract.ft_total_supply().0, TOTAL_SUPPLY);
        assert_eq!(contract.ft_balance_of(accounts(1)).0, TOTAL_SUPPLY);
    }

    #[test]
    #[should_panic(expected = "The contract is not initialized")]
    fn test_ft_default() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        let _contract = MockContract::default();
    }

    #[test]
    fn test_ft_transfer() {
        let mut context = get_context(accounts(2));
        testing_env!(context.build());
        let mut contract = MockContract::new_default_meta(accounts(2).into(), TOTAL_SUPPLY.into());
        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(contract.storage_balance_bounds().min.into())
            .predecessor_account_id(accounts(1))
            .build());
        // Paying for account registration, aka storage deposit
        contract.storage_deposit(None, None);

        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(1)
            .predecessor_account_id(accounts(2))
            .build());
        let transfer_amount = TOTAL_SUPPLY / 3;
        contract.ft_transfer(accounts(1), transfer_amount.into(), None);

        testing_env!(context
            .storage_usage(env::storage_usage())
            .account_balance(env::account_balance())
            .is_view(true)
            .attached_deposit(0)
            .build());
        assert_eq!(
            contract.ft_balance_of(accounts(2)).0,
            (TOTAL_SUPPLY - transfer_amount)
        );
        assert_eq!(contract.ft_balance_of(accounts(1)).0, transfer_amount);
    }

    fn setup_contract() -> (
        VMContextBuilder,
        RealityParcelVouchersContract,
        MockContract,
    ) {
        let mut context = VMContextBuilder::new();
        testing_env!(context.predecessor_account_id(accounts(0)).build());

        // Building parcel contract
        let contract = RealityParcelVouchersContract::new_default_meta(accounts(0), accounts(4));

        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(1)
            .predecessor_account_id(accounts(2))
            .build());

        // Building fungible token contract
        let mut ft_contract =
            MockContract::new_default_meta(accounts(2).into(), TOTAL_SUPPLY.into());
        // Paying for account registration, aka storage deposit
        ft_contract.storage_deposit(Some(accounts(2)), None);

        (context, contract, ft_contract)
    }

    #[test]
    fn test_new() {
        let mut context = get_context(accounts(1));
        testing_env!(context.build());
        let contract = RealityParcelVouchersContract::new(
            accounts(1),
            accounts(4),
            NFTContractMetadata {
                spec: NFT_METADATA_SPEC.to_string(),
                name: "Triple Triad".to_string(),
                symbol: "TRIAD".to_string(),
                icon: Some(DATA_IMAGE_SVG_REAL_ICON.to_string()),
                base_uri: Some("https://ipfs.fleek.co/ipfs/".to_string()),
                reference: None,
                reference_hash: None,
            },
            500,
        );
        testing_env!(context.is_view(true).build());
        assert_eq!(contract.get_owner(), accounts(1).to_string());
        assert_eq!(
            contract.nft_metadata().base_uri.unwrap(),
            "https://ipfs.fleek.co/ipfs/".to_string()
        );
        assert_eq!(
            contract.nft_metadata().icon.unwrap(),
            DATA_IMAGE_SVG_REAL_ICON.to_string()
        );
    }

    fn create_series(
        contract: &mut RealityParcelVouchersContract,
        royalty: &HashMap<AccountId, u32>,
        price: Option<U128>,
        copies: Option<u64>,
    ) -> TokenSeriesId {
        let token_series_json = contract.nft_create_series(
            None,
            TokenMetadata {
                title: Some("Tsundere land".to_string()),
                description: None,
                media: Some(
                    "bafybeidzcan4nzcz7sczs4yzyxly4galgygnbjewipj6haco4kffoqpkiy".to_string(),
                ),
                media_hash: None,
                copies: copies,
                issued_at: None,
                expires_at: None,
                starts_at: None,
                updated_at: None,
                extra: None,
                reference: Some(
                    "bafybeicg4ss7qh5odijfn2eogizuxkrdh3zlv4eftcmgnljwu7dm64uwji".to_string(),
                ),
                reference_hash: None,
            },
            price,
            Some(royalty.clone()),
        );

        token_series_json.token_series_id
    }

    #[test]
    fn test_create_series() {
        let (mut context, mut contract, _) = setup_contract();
        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_CREATE_SERIES)
            .build());

        let mut royalty: HashMap<AccountId, u32> = HashMap::new();
        royalty.insert(accounts(1).to_string(), 1000);
        create_series(
            &mut contract,
            &royalty,
            Some(U128::from(1 * 10u128.pow(24))),
            None,
        );

        let nft_series_return = contract.nft_get_series_single("1".to_string());
        assert_eq!(nft_series_return.creator_id, accounts(1).to_string());

        assert_eq!(nft_series_return.token_series_id, "1",);

        assert_eq!(nft_series_return.royalty, royalty,);

        assert!(nft_series_return.metadata.copies.is_none());

        assert_eq!(
            nft_series_return.metadata.title.unwrap(),
            "Tsundere land".to_string()
        );

        assert_eq!(
            nft_series_return.metadata.reference.unwrap(),
            "bafybeicg4ss7qh5odijfn2eogizuxkrdh3zlv4eftcmgnljwu7dm64uwji".to_string()
        );
    }

    #[test]
    fn test_mint() {
        let (mut context, mut contract, mut ft) = setup_contract();
        testing_env!(context
            .predecessor_account_id(accounts(1))
            .account_balance(STORAGE_FOR_CREATE_SERIES)
            .attached_deposit(STORAGE_FOR_CREATE_SERIES)
            .build());

        let mut royalty: HashMap<AccountId, u32> = HashMap::new();
        royalty.insert(accounts(1).to_string(), 1000);

        let token_series_id = create_series(&mut contract, &royalty, None, None);

        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(ft.storage_balance_bounds().min.into())
            .predecessor_account_id(accounts(0))
            .build());

        // Paying for account registration, aka storage deposit
        ft.storage_deposit(Some(accounts(0)), None);

        testing_env!(context
            .predecessor_account_id(accounts(2))
            .account_balance(STORAGE_FOR_MINT)
            .attached_deposit(STORAGE_FOR_MINT)
            .build());

        let token_id = contract.ft_stake_and_nft_mint(
            accounts(2).to_string(),
            (TOTAL_SUPPLY / 4).into(),
            token_series_id,
        );

        let token_from_nft_token = contract.nft_token(token_id);
        assert_eq!(
            token_from_nft_token.unwrap().owner_id,
            accounts(2).to_string()
        )
    }

    #[test]
    #[should_panic(expected = "RealityChain: Token series is not mintable")]
    fn test_invalid_mint_above_copies() {
        let (mut context, mut contract, _) = setup_contract();
        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_CREATE_SERIES)
            .build());

        let mut royalty: HashMap<AccountId, u32> = HashMap::new();
        royalty.insert(accounts(1).to_string(), 1000);

        let token_series_id = create_series(&mut contract, &royalty, None, Some(1));

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_MINT)
            .build());

        contract.ft_stake_and_nft_mint(
            accounts(0).to_string(),
            (TOTAL_SUPPLY / 4).into(),
            token_series_id.clone(),
        );
        contract.ft_stake_and_nft_mint(
            accounts(0).to_string(),
            (TOTAL_SUPPLY / 4).into(),
            token_series_id,
        );
    }

    #[test]
    fn test_decrease_copies() {
        let (mut context, mut contract, _) = setup_contract();
        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_CREATE_SERIES)
            .build());

        let mut royalty: HashMap<AccountId, u32> = HashMap::new();
        royalty.insert(accounts(1).to_string(), 1000);

        let token_series_id = create_series(&mut contract, &royalty, None, Some(5));

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_MINT)
            .build());

        contract.ft_stake_and_nft_mint(
            accounts(0).to_string(),
            (TOTAL_SUPPLY / 4).into(),
            token_series_id.clone(),
        );
        contract.ft_stake_and_nft_mint(
            accounts(0).to_string(),
            (TOTAL_SUPPLY / 4).into(),
            token_series_id,
        );

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(1)
            .build());

        contract.nft_decrease_series_copies("1".to_string(), U64::from(3));
    }

    #[test]
    #[should_panic(expected = "RealityChain: cannot decrease supply, already minted : 2")]
    fn test_invalid_decrease_copies() {
        let (mut context, mut contract, _) = setup_contract();
        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_CREATE_SERIES)
            .build());

        let mut royalty: HashMap<AccountId, u32> = HashMap::new();
        royalty.insert(accounts(1).to_string(), 1000);

        let token_series_id = create_series(&mut contract, &royalty, None, Some(5));

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_MINT)
            .build());

        contract.ft_stake_and_nft_mint(
            accounts(0).to_string(),
            (TOTAL_SUPPLY / 4).into(),
            token_series_id.clone(),
        );
        contract.ft_stake_and_nft_mint(
            accounts(0).to_string(),
            (TOTAL_SUPPLY / 4).into(),
            token_series_id,
        );

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(1)
            .build());

        contract.nft_decrease_series_copies("1".to_string(), U64::from(4));
    }

    #[test]
    #[should_panic(expected = "RealityChain: price higher than 1000000000000000000000000000000000")]
    fn test_invalid_price_shouldnt_be_higher_than_max_price() {
        let (mut context, mut contract, _) = setup_contract();
        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_CREATE_SERIES)
            .build());

        let mut royalty: HashMap<AccountId, u32> = HashMap::new();
        royalty.insert(accounts(1).to_string(), 1000);

        create_series(
            &mut contract,
            &royalty,
            Some(U128::from(1_000_000_000 * 10u128.pow(24))),
            None,
        );

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(1)
            .build());
    }

    #[test]
    fn test_nft_burn() {
        let (mut context, mut contract, _) = setup_contract();
        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_CREATE_SERIES)
            .build());

        let mut royalty: HashMap<AccountId, u32> = HashMap::new();
        royalty.insert(accounts(1).to_string(), 1000);

        let token_series_id = create_series(&mut contract, &royalty, None, None);

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_MINT)
            .build());

        let token_id = contract.ft_stake_and_nft_mint(
            accounts(0).to_string(),
            (TOTAL_SUPPLY / 4).into(),
            token_series_id,
        );

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(1)
            .build());

        contract.nft_burn(token_id.clone());
        let token = contract.nft_token(token_id);
        assert!(token.is_none());
    }

    #[test]
    fn test_nft_transfer() {
        let (mut context, mut contract, _) = setup_contract();
        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_CREATE_SERIES)
            .build());

        let mut royalty: HashMap<AccountId, u32> = HashMap::new();
        royalty.insert(accounts(1).to_string(), 1000);

        let token_series_id = create_series(&mut contract, &royalty, None, None);

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_MINT)
            .build());

        let token_id = contract.ft_stake_and_nft_mint(
            accounts(2).to_string(),
            (TOTAL_SUPPLY / 4).into(),
            token_series_id,
        );

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(1)
            .build());

        contract.nft_transfer(accounts(3), token_id.clone(), None, None);

        let token = contract.nft_token(token_id).unwrap();
        assert_eq!(token.owner_id, accounts(3).to_string())
    }

    #[test]
    fn test_nft_transfer_unsafe() {
        let (mut context, mut contract, _) = setup_contract();
        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_CREATE_SERIES)
            .build());

        let mut royalty: HashMap<AccountId, u32> = HashMap::new();
        royalty.insert(accounts(1).to_string(), 1000);

        let token_series_id = create_series(&mut contract, &royalty, None, None);

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_MINT)
            .build());

        let token_id = contract.ft_stake_and_nft_mint(
            accounts(0).to_string(),
            (TOTAL_SUPPLY / 4).into(),
            token_series_id,
        );

        testing_env!(context.predecessor_account_id(accounts(1)).build());

        contract.nft_transfer_unsafe(accounts(3), token_id.clone(), None, None);

        let token = contract.nft_token(token_id).unwrap();
        assert_eq!(token.owner_id, accounts(3).to_string())
    }

    #[test]
    fn test_nft_transfer_payout() {
        let (mut context, mut contract, _) = setup_contract();
        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_CREATE_SERIES)
            .build());

        let mut royalty: HashMap<AccountId, u32> = HashMap::new();
        royalty.insert(accounts(1).to_string(), 1000);

        let token_series_id = create_series(&mut contract, &royalty, None, None);

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(STORAGE_FOR_MINT)
            .build());

        let token_id = contract.ft_stake_and_nft_mint(
            accounts(0).to_string(),
            (TOTAL_SUPPLY / 4).into(),
            token_series_id,
        );

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .attached_deposit(1)
            .build());

        let payout = contract.nft_transfer_payout(
            accounts(3),
            token_id.clone(),
            Some(0),
            Some(U128::from(1 * 10u128.pow(24))),
            Some(10),
        );

        let mut payout_calc: HashMap<AccountId, U128> = HashMap::new();
        payout_calc.insert(
            accounts(1).to_string(),
            U128::from((10000 * (1 * 10u128.pow(24))) / 10_000),
        );

        assert_eq!(payout.unwrap().payout, payout_calc);

        let token = contract.nft_token(token_id).unwrap();
        assert_eq!(token.owner_id, accounts(3).to_string())
    }

    #[test]
    fn test_change_transaction_fee_immediately() {
        let (mut context, mut contract, _) = setup_contract();

        testing_env!(context
            .predecessor_account_id(accounts(0))
            .attached_deposit(1)
            .build());

        contract.set_transaction_fee(100, None);

        assert_eq!(contract.get_transaction_fee().current_fee, 100);
    }

    #[test]
    fn test_change_transaction_fee_with_time() {
        let (mut context, mut contract, _) = setup_contract();

        testing_env!(context
            .predecessor_account_id(accounts(0))
            .attached_deposit(1)
            .build());

        assert_eq!(contract.get_transaction_fee().current_fee, 500);
        assert_eq!(contract.get_transaction_fee().next_fee, None);
        assert_eq!(contract.get_transaction_fee().start_time, None);

        let next_fee: u16 = 100;
        let start_time: Timestamp = 1618109122863866400;
        let start_time_sec: TimestampSec = to_sec(start_time);
        contract.set_transaction_fee(next_fee, Some(start_time_sec));

        assert_eq!(contract.get_transaction_fee().current_fee, 500);
        assert_eq!(contract.get_transaction_fee().next_fee, Some(next_fee));
        assert_eq!(
            contract.get_transaction_fee().start_time,
            Some(start_time_sec)
        );

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .block_timestamp(start_time + 1)
            .build());

        contract.calculate_current_transaction_fee();
        assert_eq!(contract.get_transaction_fee().current_fee, next_fee);
        assert_eq!(contract.get_transaction_fee().next_fee, None);
        assert_eq!(contract.get_transaction_fee().start_time, None);
    }

    #[test]
    fn test_transaction_fee_locked() {
        let (mut context, mut contract, _) = setup_contract();

        testing_env!(context
            .predecessor_account_id(accounts(0))
            .attached_deposit(1)
            .build());

        assert_eq!(contract.get_transaction_fee().current_fee, 500);
        assert_eq!(contract.get_transaction_fee().next_fee, None);
        assert_eq!(contract.get_transaction_fee().start_time, None);

        let next_fee: u16 = 100;
        let start_time: Timestamp = 1618109122863866400;
        let start_time_sec: TimestampSec = to_sec(start_time);
        contract.set_transaction_fee(next_fee, Some(start_time_sec));

        let mut royalty: HashMap<AccountId, u32> = HashMap::new();
        royalty.insert(accounts(1).to_string(), 1000);

        testing_env!(context
            .predecessor_account_id(accounts(0))
            .attached_deposit(STORAGE_FOR_CREATE_SERIES)
            .build());

        create_series(
            &mut contract,
            &royalty,
            Some(U128::from(1 * 10u128.pow(24))),
            None,
        );

        testing_env!(context
            .predecessor_account_id(accounts(0))
            .attached_deposit(1)
            .build());

        contract.nft_set_series_price("1".to_string(), None);

        assert_eq!(contract.get_transaction_fee().current_fee, 500);
        assert_eq!(contract.get_transaction_fee().next_fee, Some(next_fee));
        assert_eq!(
            contract.get_transaction_fee().start_time,
            Some(start_time_sec)
        );

        testing_env!(context
            .predecessor_account_id(accounts(1))
            .block_timestamp(start_time + 1)
            .attached_deposit(1)
            .build());

        contract.calculate_current_transaction_fee();
        assert_eq!(contract.get_transaction_fee().current_fee, next_fee);
        assert_eq!(contract.get_transaction_fee().next_fee, None);
        assert_eq!(contract.get_transaction_fee().start_time, None);

        let series = contract.nft_get_series_single("1".to_string());
        let series_transaction_fee: u128 = series.transaction_fee.unwrap().into();
        assert_eq!(series_transaction_fee, 500);
    }
}
