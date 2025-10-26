import { expect } from "chai";
import { ethers } from "hardhat";
import { LendingPool, LeverageManager } from "../typechain";

describe("LeverageManager", function () {
    let lendingPool: LendingPool;
    let leverageManager: LeverageManager;
    let owner: any;
    let user: any;

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();

        const LendingPoolFactory = await ethers.getContractFactory("LendingPool");
        lendingPool = await LendingPoolFactory.deploy();
        await lendingPool.deployed();

        const LeverageManagerFactory = await ethers.getContractFactory("LeverageManager");
        leverageManager = await LeverageManagerFactory.deploy(lendingPool.address);
        await leverageManager.deployed();
    });

    it("should allow user to leverage their collateral", async function () {
        // User deposits collateral
        await lendingPool.connect(user).deposit({ value: ethers.utils.parseEther("10") });

        // User leverages their position
        await leverageManager.connect(user).leverage(ethers.utils.parseEther("5"));

        const userPosition = await leverageManager.getUserPosition(user.address);
        expect(userPosition.leverageAmount).to.equal(ethers.utils.parseEther("5"));
    });

    it("should revert if leverage exceeds collateral", async function () {
        // User deposits collateral
        await lendingPool.connect(user).deposit({ value: ethers.utils.parseEther("10") });

        // Attempt to leverage more than collateral
        await expect(leverageManager.connect(user).leverage(ethers.utils.parseEther("15"))).to.be.revertedWith("Leverage exceeds collateral");
    });

    it("should allow user to repay leveraged amount", async function () {
        // User deposits collateral
        await lendingPool.connect(user).deposit({ value: ethers.utils.parseEther("10") });

        // User leverages their position
        await leverageManager.connect(user).leverage(ethers.utils.parseEther("5"));

        // User repays leveraged amount
        await leverageManager.connect(user).repay(ethers.utils.parseEther("5"));

        const userPosition = await leverageManager.getUserPosition(user.address);
        expect(userPosition.leverageAmount).to.equal(0);
    });
});