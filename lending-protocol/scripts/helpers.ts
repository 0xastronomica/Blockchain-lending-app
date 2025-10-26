import { ethers } from "hardhat";

export async function getContractInstance(contractName: string, signer?: ethers.Signer) {
    const ContractFactory = await ethers.getContractFactory(contractName, signer);
    return ContractFactory.deploy();
}

export async function waitForTransaction(tx: ethers.ContractTransaction) {
    const receipt = await tx.wait();
    return receipt;
}

export function formatUnits(value: ethers.BigNumber, decimals: number) {
    return ethers.utils.formatUnits(value, decimals);
}

export function parseUnits(value: string, decimals: number) {
    return ethers.utils.parseUnits(value, decimals);
}