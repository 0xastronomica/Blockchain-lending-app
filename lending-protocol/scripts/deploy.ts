import { ethers } from "hardhat";

async function main() {
    const LendingPool = await ethers.getContractFactory("LendingPool");
    const lendingPool = await LendingPool.deploy();
    await lendingPool.deployed();
    console.log("LendingPool deployed to:", lendingPool.address);

    const LeverageManager = await ethers.getContractFactory("LeverageManager");
    const leverageManager = await LeverageManager.deploy(lendingPool.address);
    await leverageManager.deployed();
    console.log("LeverageManager deployed to:", leverageManager.address);

    const InterestRateModel = await ethers.getContractFactory("InterestRateModel");
    const interestRateModel = await InterestRateModel.deploy();
    await interestRateModel.deployed();
    console.log("InterestRateModel deployed to:", interestRateModel.address);

    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    const erc20Mock = await ERC20Mock.deploy("Mock Token", "MTK", 18, ethers.utils.parseEther("1000000"));
    await erc20Mock.deployed();
    console.log("ERC20Mock deployed to:", erc20Mock.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });