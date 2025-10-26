import { expect } from "chai";
import { ethers } from "hardhat";
import { LendingPool } from "../typechain/LendingPool";

describe("LendingPool", function () {
    let lendingPool: LendingPool;

    beforeEach(async function () {
        const LendingPoolFactory = await ethers.getContractFactory("LendingPool");
        lendingPool = await LendingPoolFactory.deploy();
        await lendingPool.deployed();
    });

    it("should allow deposits", async function () {
        const [owner] = await ethers.getSigners();
        const depositAmount = ethers.utils.parseEther("1.0");

        await lendingPool.deposit({ value: depositAmount });

        const balance = await lendingPool.getBalance(owner.address);
        expect(balance).to.equal(depositAmount);
    });

    it("should allow withdrawals", async function () {
        const [owner] = await ethers.getSigners();
        const depositAmount = ethers.utils.parseEther("1.0");

        await lendingPool.deposit({ value: depositAmount });
        await lendingPool.withdraw(depositAmount);

        const balance = await lendingPool.getBalance(owner.address);
        expect(balance).to.equal(0);
    });

    it("should calculate interest correctly", async function () {
        const depositAmount = ethers.utils.parseEther("1.0");
        await lendingPool.deposit({ value: depositAmount });

        // Simulate time passing for interest calculation
        await ethers.provider.send("evm_increaseTime", [3600]); // 1 hour
        await ethers.provider.send("evm_mine");

        const interest = await lendingPool.calculateInterest(depositAmount);
        expect(interest).to.be.gt(0);
    });

    it("should allow borrowing against collateral", async function () {
        const [owner] = await ethers.getSigners();
        const depositAmount = ethers.utils.parseEther("1.0");
        const borrowAmount = ethers.utils.parseEther("0.5");

        await lendingPool.deposit({ value: depositAmount });
        await lendingPool.borrow(borrowAmount);

        const borrowedAmount = await lendingPool.getBorrowedAmount(owner.address);
        expect(borrowedAmount).to.equal(borrowAmount);
    });
});