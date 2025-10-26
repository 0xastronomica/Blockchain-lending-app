import { LendingPool } from '../../contracts/LendingPool';
import { LeverageManager } from '../../contracts/LeverageManager';
import { InterestRateModel } from '../../contracts/InterestRateModel';
import { ethers } from 'ethers';

export class ProtocolService {
    private lendingPool: LendingPool;
    private leverageManager: LeverageManager;
    private interestRateModel: InterestRateModel;

    constructor(lendingPoolAddress: string, leverageManagerAddress: string, interestRateModelAddress: string) {
        this.lendingPool = new LendingPool(lendingPoolAddress);
        this.leverageManager = new LeverageManager(leverageManagerAddress);
        this.interestRateModel = new InterestRateModel(interestRateModelAddress);
    }

    async deposit(asset: string, amount: string, userAddress: string): Promise<void> {
        const tx = await this.lendingPool.deposit(asset, ethers.utils.parseUnits(amount, 18), userAddress);
        await tx.wait();
    }

    async withdraw(asset: string, amount: string, userAddress: string): Promise<void> {
        const tx = await this.lendingPool.withdraw(asset, ethers.utils.parseUnits(amount, 18), userAddress);
        await tx.wait();
    }

    async borrow(asset: string, amount: string, userAddress: string): Promise<void> {
        const tx = await this.lendingPool.borrow(asset, ethers.utils.parseUnits(amount, 18), userAddress);
        await tx.wait();
    }

    async repay(asset: string, amount: string, userAddress: string): Promise<void> {
        const tx = await this.lendingPool.repay(asset, ethers.utils.parseUnits(amount, 18), userAddress);
        await tx.wait();
    }

    async manageLeverage(userAddress: string, asset: string, amount: string, leverageRatio: number): Promise<void> {
        const tx = await this.leverageManager.manageLeverage(userAddress, asset, ethers.utils.parseUnits(amount, 18), leverageRatio);
        await tx.wait();
    }

    async getInterestRate(asset: string): Promise<number> {
        return await this.interestRateModel.getInterestRate(asset);
    }
}