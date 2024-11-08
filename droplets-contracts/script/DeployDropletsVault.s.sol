//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Script, console} from 'forge-std/Script.sol';
import {DropletsVault} from '../src/DropletsVault.sol';
import {IERC20} from 'openzeppelin-contracts/contracts/token/ERC20/IERC20.sol';
import {HelperConfig} from './HelperConfig.sol';

contract DeployDropletsVault is Script {
  HelperConfig public helperConfig = new HelperConfig();

  function deploy() public returns (DropletsVault) {
    vm.startBroadcast();

    console.log('Deploying DropletsVault...');
    // I want to console.log the usdcContractAddress from helperConfig
    console.log('USDC contract address:', helperConfig.getUsdcContractAddress());
    DropletsVault vault = new DropletsVault(IERC20(helperConfig.getUsdcContractAddress()), 10000);
    console.log('DropletsVault deployed at:', address(vault));

    vm.stopBroadcast();
    return vault;
  }

  function run() public {
    deploy();
  }
}
