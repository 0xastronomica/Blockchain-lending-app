import { LendingPool } from '@lending-protocol/contracts/LendingPool';
import { LeverageManager } from '@lending-protocol/contracts/LeverageManager';
import { InterestRateModel } from '@lending-protocol/contracts/InterestRateModel';
import { ERC20Mock } from '@lending-protocol/contracts/ERC20Mock';

export class LendingProtocolSDK {
    private lendingPool: LendingPool;
    private leverageManager: LeverageManager;
    private interestRateModel: InterestRateModel;

    constructor(lendingPoolAddress: string, leverageManagerAddress: string, interestRateModelAddress: string) {
        this.lendingPool = new LendingPool(lendingPoolAddress);
        this.leverageManager = new LeverageManager(leverageManagerAddress);
        this.interestRateModel = new InterestRateModel(interestRateModelAddress);
    }

    async deposit(tokenAddress: string, amount: string): Promise<void> {
        await this.lendingPool.deposit(tokenAddress, amount);
    }

    async withdraw(tokenAddress: string, amount: string): Promise<void> {
        await this.lendingPool.withdraw(tokenAddress, amount);
    }

    async borrow(tokenAddress: string, amount: string): Promise<void> {
        await this.lendingPool.borrow(tokenAddress, amount);
    }

    async repay(tokenAddress: string, amount: string): Promise<void> {
        await this.lendingPool.repay(tokenAddress, amount);
    }

    async leverage(tokenAddress: string, amount: string): Promise<void> {
        await this.leverageManager.leverage(tokenAddress, amount);
    }

    async getInterestRate(): Promise<number> {
        return await this.interestRateModel.getCurrentRate();
    }
}