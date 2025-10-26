// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/ILendingPool.sol";
import "./InterestRateModel.sol";
import "./ERC20Mock.sol";

contract LendingPool is ILendingPool {
    struct User {
        uint256 balance;
        uint256 borrowedAmount;
    }

    mapping(address => User) private users;
    mapping(address => ERC20Mock) public collateralTokens;
    InterestRateModel public interestRateModel;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event Borrowed(address indexed user, uint256 amount);
    event Repaid(address indexed user, uint256 amount);

    constructor(InterestRateModel _interestRateModel) {
        interestRateModel = _interestRateModel;
    }

    function deposit(address token, uint256 amount) external override {
        require(amount > 0, "Amount must be greater than 0");
        collateralTokens[token].transferFrom(msg.sender, address(this), amount);
        users[msg.sender].balance += amount;
        emit Deposited(msg.sender, amount);
    }

    function withdraw(address token, uint256 amount) external override {
        require(users[msg.sender].balance >= amount, "Insufficient balance");
        users[msg.sender].balance -= amount;
        collateralTokens[token].transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    function borrow(uint256 amount) external override {
        require(amount > 0, "Amount must be greater than 0");
        uint256 availableToBorrow = getAvailableToBorrow(msg.sender);
        require(amount <= availableToBorrow, "Borrow amount exceeds limit");
        users[msg.sender].borrowedAmount += amount;
        payable(msg.sender).transfer(amount);
        emit Borrowed(msg.sender, amount);
    }

    function repay(uint256 amount) external override {
        require(users[msg.sender].borrowedAmount >= amount, "Repay amount exceeds borrowed amount");
        users[msg.sender].borrowedAmount -= amount;
        emit Repaid(msg.sender, amount);
    }

    function getAvailableToBorrow(address user) public view returns (uint256) {
        // Logic to calculate available to borrow based on collateral and borrowed amount
        return users[user].balance; // Simplified for demonstration
    }

    // Fallback function to receive Ether
    receive() external payable {}
}