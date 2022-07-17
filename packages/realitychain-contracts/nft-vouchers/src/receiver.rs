use crate::metadata::StakeParams;
use crate::*;
use near_contract_standards::fungible_token::receiver::FungibleTokenReceiver;
use near_sdk::{near_bindgen, PromiseOrValue};

#[near_bindgen]
impl FungibleTokenReceiver for RealityParcelVouchersContract {
    #[allow(unused_imports)]
    fn ft_on_transfer(
        &mut self,
        sender_id: ValidAccountId,
        amount: U128,
        msg: String,
    ) -> PromiseOrValue<U128> {
        let StakeParams { token_series_id } =
            near_sdk::serde_json::from_str(&msg).expect("Invalid stake argument");

        let _token_series = self
            .token_series_by_id
            .get(&token_series_id)
            .expect("RealityChain: Token series not exist");

        let token_id: TokenId = self.nft_mint_series(token_series_id, sender_id.to_string());

        NearEvent::log_nft_mint(sender_id.to_string(), vec![token_id], None);

        PromiseOrValue::Value(U128(0))
    }
}
