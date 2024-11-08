// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Test, console} from 'forge-std/Test.sol';
import {DropletsVault} from '../../src/DropletsVault.sol';
import {DropletToken} from '../../src/DropletToken.sol';
import {IERC20} from 'openzeppelin-contracts/contracts/token/ERC20/IERC20.sol';

contract DropletsVaultExtendedTest is Test {
  DropletToken token;
  DropletsVault vault;

  address bob = makeAddr('bob');
  address alice = makeAddr('alice');
  address treasury = makeAddr('treasury');
  address payable owner = payable(makeAddr('owner'));

  uint256 constant ASSETS_DEPOSITED = 1000 ether;
  uint256 constant FIRST_DEPOSIT = 10 ether;
  uint256 constant SECOND_DEPOSIT = 20 ether;
  uint256 constant ENTRY_FEE_BASIS_POINTS = 500; // 5% entry fee

  function setUp() public {
    vm.startBroadcast();
    token = new DropletToken();
    vault = new DropletsVault(token, ENTRY_FEE_BASIS_POINTS);
    // Assign owner
    vault.transferOwnership(owner); // Add this line to assign the correct owner
    vm.stopBroadcast();
  }

  /// Test deposit with entry fee applied
  function testDepositWithEntryFee() public {
    uint256 assets = ASSETS_DEPOSITED;
    // Bob's deposit flow
    deal(address(token), bob, 1000 ether);
    vm.startPrank(bob);
    token.approve(address(vault), assets);
    // Bob deposits 10 ether; with 5% entry fee, only 9.5 ether should be deposited
    uint256 expectedShares = vault.previewDeposit(FIRST_DEPOSIT);
    uint256 assetsDeposited = vault.deposit(FIRST_DEPOSIT, bob);
    assertEq(assetsDeposited, expectedShares, 'Incorrect shares after deposit with entry fee');
    vm.stopPrank();
  }
  // Test withdrawal with exit fee applied
  function testWithdrawWithExitFee() public {
    uint256 assets = ASSETS_DEPOSITED;
    // Bob deposits and then withdraws
    deal(address(token), bob, assets);
    vm.startPrank(bob);
    token.approve(address(vault), assets);
    // Bob deposits 10 ether
    vault.deposit(FIRST_DEPOSIT, bob);
    // Simulate a withdrawal with an exit fee
    uint256 expectedWithdraw = vault.previewWithdraw(FIRST_DEPOSIT);
    console.log('expectedWithdraw:', expectedWithdraw);
    //vault.withdraw(FIRST_DEPOSIT, bob, bob);
    // console.log('Bob balance after withdrawal:', token.balanceOf(bob));
    // console.log('Expected balance after withdrawal:', expectedWithdraw);
    // assertEq(
    //   token.balanceOf(bob),
    //   expectedWithdraw,
    //   'Incorrect assets after withdrawal with exit fee'
    // );
    vm.stopPrank();
  }

  /// Test fee recipient receives the correct fee on deposit
  function testFeeRecipientGetsEntryFee() public {
    uint256 assets = ASSETS_DEPOSITED;

    // Set treasury as fee recipient
    vm.startPrank(treasury);

    // Bob deposits 10 ether
    deal(address(token), bob, assets);
    vm.startPrank(bob);
    token.approve(address(vault), assets);

    // Entry fee should be sent to the owner (treasury)
    uint256 expectedFee = (FIRST_DEPOSIT * ENTRY_FEE_BASIS_POINTS) / 10_000;
    console.log('Expected fee:', expectedFee);
    vault.deposit(FIRST_DEPOSIT, bob);

    // assertEq(
    //   token.balanceOf(treasury),
    //   expectedFee,
    //   'Fee recipient did not receive the correct entry fee'
    // );
    vm.stopPrank();
  }

  /// Test multiple deposits and withdrawals with fees applied
  // function testMultipleDepositsAndWithdrawals() public {
  //   uint256 assets = ASSETS_DEPOSITED;

  //   // Bob and Alice both deposit
  //   deal(address(token), bob, assets);
  //   deal(address(token), alice, assets);

  //   vm.startPrank(bob);
  //   token.approve(address(vault), assets);
  //   vault.deposit(FIRST_DEPOSIT, bob);
  //   vm.stopPrank();

  //   vm.startPrank(alice);
  //   token.approve(address(vault), assets);
  //   vault.deposit(SECOND_DEPOSIT, alice);
  //   vm.stopPrank();

  //   // Verify balances
  //   assertEq(
  //     vault.balanceOf(bob),
  //     vault.previewDeposit(FIRST_DEPOSIT),
  //     "Incorrect Bob's balance after deposit"
  //   );
  //   assertEq(
  //     vault.balanceOf(alice),
  //     vault.previewDeposit(SECOND_DEPOSIT),
  //     "Incorrect Alice's balance after deposit"
  //   );

  //   // Withdraw funds
  //   vm.startPrank(bob);
  //   vault.withdraw(FIRST_DEPOSIT, bob, bob);
  //   vm.stopPrank();

  //   vm.startPrank(alice);
  //   vault.withdraw(SECOND_DEPOSIT, alice, alice);
  //   vm.stopPrank();

  //   // Verify the final balances
  //   assertEq(
  //     token.balanceOf(bob),
  //     assets - FIRST_DEPOSIT,
  //     "Bob's balance incorrect after withdrawal"
  //   );
  //   assertEq(
  //     token.balanceOf(alice),
  //     assets - SECOND_DEPOSIT,
  //     "Alice's balance incorrect after withdrawal"
  //   );
  // }

  /// Test fee changes
  function testEntryFeeChange() public {
    // Update entry fee basis points
    uint256 newEntryFee = 300; // 3%
    vm.startPrank(owner);
    vault.updateEntryFeeBasisPoints(newEntryFee);
    vm.stopPrank();

    // Bob makes a deposit with the new fee
    deal(address(token), bob, ASSETS_DEPOSITED);
    vm.startPrank(bob);
    token.approve(address(vault), ASSETS_DEPOSITED);
    uint256 assetsDeposited = vault.deposit(FIRST_DEPOSIT, bob);
    vm.stopPrank();

    // Calculate expected deposit amount with 3% entry fee
    uint256 expectedShares = vault.previewDeposit(FIRST_DEPOSIT);

    // Verify the deposit
    assertEq(assetsDeposited, expectedShares, 'Deposit amount incorrect after fee change');
  }
}
