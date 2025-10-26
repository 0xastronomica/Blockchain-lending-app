pragma solidity ^0.8.0;

contract InterestRateModel {
    // State variables
    uint256 public baseRate;
    uint256 public multiplier;
    uint256 public jumpMultiplier;
    uint256 public kink;

    // Events
    event InterestRateUpdated(uint256 newRate);

    // Constructor
    constructor(uint256 _baseRate, uint256 _multiplier, uint256 _jumpMultiplier, uint256 _kink) {
        baseRate = _baseRate;
        multiplier = _multiplier;
        jumpMultiplier = _jumpMultiplier;
        kink = _kink;
    }

    // Function to calculate interest rate based on utilization rate
    function getInterestRate(uint256 totalSupply, uint256 totalBorrowed) external view returns (uint256) {
        if (totalSupply == 0) {
            return 0; // No supply means no interest
        }

        uint256 utilizationRate = totalBorrowed * 1e18 / totalSupply;

        if (utilizationRate <= kink) {
            return baseRate + (utilizationRate * multiplier / 1e18);
        } else {
            uint256 excessUtilization = utilizationRate - kink;
            return baseRate + (kink * multiplier / 1e18) + (excessUtilization * jumpMultiplier / 1e18);
        }
    }

    // Function to update interest rate parameters
    function updateInterestRateParameters(uint256 _baseRate, uint256 _multiplier, uint256 _jumpMultiplier, uint256 _kink) external {
        baseRate = _baseRate;
        multiplier = _multiplier;
        jumpMultiplier = _jumpMultiplier;
        kink = _kink;
        emit InterestRateUpdated(getInterestRate(0, 0)); // Emit event with new rate
    }
}