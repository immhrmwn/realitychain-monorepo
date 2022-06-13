//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RealityChainToken is ERC20 {
  constructor() ERC20("RealityChainToken", "REAL") {
    _mint(msg.sender, 10000000 * 10 ** decimals());
  }
}