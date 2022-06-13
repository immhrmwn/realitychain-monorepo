use near_contract_standards::non_fungible_token::metadata::TokenMetadata;
use near_contract_standards::non_fungible_token::TokenId;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::json_types::U128;
use near_sdk::collections::{UnorderedMap, UnorderedSet};
use near_sdk::{AccountId, Balance, PanicOnDefault};
use std::collections::HashMap;

pub type TokenSeriesId = String;
pub type TimestampSec = u32;

#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Payout {
    pub payout: HashMap<AccountId, U128>,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct TokenSeries {
	pub metadata: TokenMetadata,
	pub creator_id: AccountId,
	pub tokens: UnorderedSet<TokenId>,
    pub price: Option<Balance>,
    pub is_mintable: bool,
    pub royalty: HashMap<AccountId, u32>
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct TokenSeriesJson {
    pub token_series_id: TokenSeriesId,
	pub metadata: TokenMetadata,
	pub creator_id: AccountId,
    pub royalty: HashMap<AccountId, u32>,
    pub transaction_fee: Option<U128>
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct TransactionFee {
    pub next_fee: Option<u16>,
    pub start_time: Option<TimestampSec>,
    pub current_fee: u16,
}

#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct MarketDataTransactionFee {
    pub transaction_fee: UnorderedMap<TokenSeriesId, u128>
}