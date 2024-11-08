//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Script, console} from 'forge-std/Script.sol';

contract HelperConfig is Script {
  struct NetworkConfig {
    address usdcContractAddress;
  }

  NetworkConfig public activeNetworkConfig;

  constructor() {
    if (block.chainid == 11155111) {
      activeNetworkConfig = getSepoliaEthConfig();
    } else {
      activeNetworkConfig = getOrCreateAnvilEthConfig();
    }
  }

  function getSepoliaEthConfig() public pure returns (NetworkConfig memory) {
    NetworkConfig memory sepoliaNetworkConfig = NetworkConfig({
      usdcContractAddress: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
    });

    console.log('Sepolia network config:', sepoliaNetworkConfig.usdcContractAddress);
    return sepoliaNetworkConfig;
  }

  function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory) {
    if (activeNetworkConfig.usdcContractAddress != address(0)) {
      return activeNetworkConfig;
    }
    vm.startBroadcast();
    NetworkConfig memory anvilEthNetworkConfig = NetworkConfig({
      usdcContractAddress: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
    });
    vm.stopBroadcast();
    console.log('Anvil network config:', anvilEthNetworkConfig.usdcContractAddress);
    return anvilEthNetworkConfig;
  }

  function getUsdcContractAddress() public view returns (address) {
    return activeNetworkConfig.usdcContractAddress;
  }
}
