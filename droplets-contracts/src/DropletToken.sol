// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {ERC20} from 'openzeppelin-contracts/contracts/token/ERC20/ERC20.sol';

contract DropletToken is ERC20 {
  constructor() ERC20('DropletToken', 'DROP') {
    _mint(msg.sender, 1_000_000 * (10 ** decimals()));
  }
}
