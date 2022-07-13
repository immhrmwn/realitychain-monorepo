use near_sdk::{ext_contract, json_types::U128};

#[ext_contract(ext_contract)]
trait ExtContract {
    fn ft_transfer(&mut self, receiver_id: AccountId, amount: U128, memo: Option<String>);
}
