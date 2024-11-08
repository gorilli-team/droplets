// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {ERC4626, Math, IERC20, ERC20, SafeERC20} from 'openzeppelin-contracts/contracts/token/ERC20/extensions/ERC4626.sol';

contract DropletsVault is ERC4626 {
  using Math for uint256;

  uint256 private constant _BASIS_POINT_SCALE = 1e4;

  address payable public vaultOwner;
  uint256 public entryFeeBasisPoints;

  event EntryFeeUpdated(uint256 oldFee, uint256 newFee);

  modifier onlyOwner() {
    require(msg.sender == vaultOwner, 'Not authorized');
    _;
  }

  constructor(
    IERC20 _asset,
    uint256 _basisPoints
  ) ERC4626(_asset) ERC20('Droplet Vault Token', 'vDROP') {
    vaultOwner = payable(msg.sender);
    entryFeeBasisPoints = _basisPoints;
  }

  function transferOwnership(address payable newOwner) external onlyOwner {
    vaultOwner = newOwner;
  }

  // === New Function: Update Entry Fee ===

  function updateEntryFeeBasisPoints(uint256 newBasisPoints) external onlyOwner {
    require(newBasisPoints <= 1000, 'Entry fee too high'); // Limit entry fee to a max of 10%
    uint256 oldFee = entryFeeBasisPoints;
    entryFeeBasisPoints = newBasisPoints;
    emit EntryFeeUpdated(oldFee, newBasisPoints);
  }

  // === Overrides ===

  /// @dev Preview taking an entry fee on deposit. See {IERC4626-previewDeposit}.
  function previewDeposit(uint256 assets) public view virtual override returns (uint256) {
    uint256 fee = _feeOnTotal(assets, _entryFeeBasisPoints());
    return super.previewDeposit(assets - fee);
  }

  /// @dev Preview adding an entry fee on mint. See {IERC4626-previewMint}.
  function previewMint(uint256 shares) public view virtual override returns (uint256) {
    uint256 assets = super.previewMint(shares);
    return assets + _feeOnRaw(assets, _entryFeeBasisPoints());
  }

  /// @dev Preview adding an exit fee on withdraw. See {IERC4626-previewWithdraw}.
  function previewWithdraw(uint256 assets) public view virtual override returns (uint256) {
    uint256 fee = _feeOnRaw(assets, _exitFeeBasisPoints());
    return super.previewWithdraw(assets + fee);
  }

  /// @dev Preview taking an exit fee on redeem. See {IERC4626-previewRedeem}.
  function previewRedeem(uint256 shares) public view virtual override returns (uint256) {
    uint256 assets = super.previewRedeem(shares);
    return assets - _feeOnTotal(assets, _exitFeeBasisPoints());
  }

  /// @dev Send entry fee to {_entryFeeRecipient}. See {IERC4626-_deposit}.
  function _deposit(
    address caller,
    address receiver,
    uint256 assets,
    uint256 shares
  ) internal virtual override {
    uint256 fee = _feeOnTotal(assets, _entryFeeBasisPoints());
    address recipient = _entryFeeRecipient();

    super._deposit(caller, receiver, assets, shares);

    if (fee > 0 && recipient != address(this)) {
      SafeERC20.safeTransfer(IERC20(asset()), recipient, fee);
    }
  }

  /// @dev Send exit fee to {_exitFeeRecipient}. See {IERC4626-_withdraw}.
  function _withdraw(
    address caller,
    address receiver,
    address owner,
    uint256 assets,
    uint256 shares
  ) internal virtual override {
    uint256 fee = _feeOnRaw(assets, _exitFeeBasisPoints());
    address recipient = _exitFeeRecipient();

    super._withdraw(caller, receiver, owner, assets, shares);

    if (fee > 0 && recipient != address(this)) {
      SafeERC20.safeTransfer(IERC20(asset()), recipient, fee);
    }
  }

  // === Fee configuration ===

  function _entryFeeBasisPoints() internal view virtual returns (uint256) {
    return entryFeeBasisPoints;
  }

  function _exitFeeBasisPoints() internal view virtual returns (uint256) {
    return 100; // 1% exit fee, adjust this as needed
  }

  function _entryFeeRecipient() internal view virtual returns (address) {
    return vaultOwner;
  }

  function _exitFeeRecipient() internal view virtual returns (address) {
    return address(0); // Set this to the treasury address or another recipient
  }

  // === Fee operations ===

  /// @dev Calculates the fees that should be added to an amount `assets` that does not already include fees.
  /// Used in {IERC4626-mint} and {IERC4626-withdraw} operations.
  function _feeOnRaw(uint256 assets, uint256 feeBasisPoints) private pure returns (uint256) {
    uint256 numerator = assets * feeBasisPoints;
    uint256 denominator = _BASIS_POINT_SCALE;
    uint256 result = numerator / denominator;
    return result + (numerator % denominator != 0 ? 1 : 0);
  }

  /// @dev Calculates the fee part of an amount `assets` that already includes fees.
  /// Used in {IERC4626-deposit} and {IERC4626-redeem} operations.
  function _feeOnTotal(uint256 assets, uint256 feeBasisPoints) private pure returns (uint256) {
    uint256 numerator = assets * feeBasisPoints;
    uint256 denominator = feeBasisPoints + _BASIS_POINT_SCALE;
    uint256 result = numerator / denominator;
    return result + (numerator % denominator != 0 ? 1 : 0);
  }
}
