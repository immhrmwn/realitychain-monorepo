use crate::*;
use crate::metadata::StakeParams;

trait FungibleTokenReceiver {
    fn ft_on_transfer(&mut self, sender_id: AccountId, amount: U128, msg: String) -> TokenId;
}

#[near_bindgen]
impl FungibleTokenReceiver for RealityParcelVouchersContract {
    #[payable]
    fn ft_on_transfer(&mut self, sender_id: AccountId, _amount: U128, msg: String) -> TokenId {
        let initial_storage_usage = env::storage_usage();
		let StakeParams { token_series_id } =
			near_sdk::serde_json::from_str(&msg).expect("RealityChain: Invalid stake argument");

        let _token_series = self
            .token_series_by_id
            .get(&token_series_id)
            .expect("RealityChain: Token series not exist");
            
        let token_id: TokenId = self.nft_mint_series(token_series_id, sender_id.to_string());

        refund_deposit(env::storage_usage() - initial_storage_usage, 0);

        NearEvent::log_nft_mint(sender_id.to_string(), vec![token_id.clone()], None);

        token_id
    }
}
