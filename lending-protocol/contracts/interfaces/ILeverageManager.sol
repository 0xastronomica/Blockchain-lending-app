// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ILeverageManager {
    function openPosition(
        address asset,
        uint256 amount,
        uint256 leverageFactor
    ) external returns (uint256 positionId);

    function closePosition(uint256 positionId) external returns (uint256 amountReturned);

    function adjustLeverage(
        uint256 positionId,
        uint256 newLeverageFactor
    ) external returns (uint256 newAmount);

    function getPositionDetails(uint256 positionId)
        external
        view
        returns (
            address asset,
            uint256 amount,
            uint256 leverageFactor,
            uint256 collateralValue
        );

    function liquidatePosition(uint256 positionId) external returns (uint256 amountRecovered);
}