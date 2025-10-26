import React, { useState } from 'react';

const LeverageWidget = () => {
    const [collateralAmount, setCollateralAmount] = useState('');
    const [leverageFactor, setLeverageFactor] = useState(1);
    const [borrowedAmount, setBorrowedAmount] = useState(0);
    const [totalExposure, setTotalExposure] = useState(0);

    const handleCollateralChange = (e) => {
        setCollateralAmount(e.target.value);
    };

    const handleLeverageChange = (e) => {
        const factor = parseFloat(e.target.value);
        setLeverageFactor(factor);
        calculateTotalExposure(collateralAmount, factor);
    };

    const calculateTotalExposure = (collateral, factor) => {
        const exposure = parseFloat(collateral) * factor;
        setTotalExposure(exposure);
        setBorrowedAmount(exposure - parseFloat(collateral));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle leverage position submission
    };

    return (
        <div className="leverage-widget">
            <h2>Manage Leverage Position</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Collateral Amount:</label>
                    <input
                        type="number"
                        value={collateralAmount}
                        onChange={handleCollateralChange}
                        required
                    />
                </div>
                <div>
                    <label>Leverage Factor:</label>
                    <input
                        type="number"
                        value={leverageFactor}
                        onChange={handleLeverageChange}
                        min="1"
                        step="0.1"
                        required
                    />
                </div>
                <div>
                    <p>Borrowed Amount: {borrowedAmount}</p>
                    <p>Total Exposure: {totalExposure}</p>
                </div>
                <button type="submit">Submit Leverage Position</button>
            </form>
        </div>
    );
};

export default LeverageWidget;