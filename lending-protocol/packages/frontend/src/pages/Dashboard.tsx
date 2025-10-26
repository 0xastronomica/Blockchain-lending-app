import React from 'react';
import { useEffect, useState } from 'react';
import { fetchUserData, fetchLendingOptions } from '../services/apiService';
import LeverageWidget from '../components/LeverageWidget';

const Dashboard: React.FC = () => {
    const [userData, setUserData] = useState(null);
    const [lendingOptions, setLendingOptions] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const user = await fetchUserData();
            const options = await fetchLendingOptions();
            setUserData(user);
            setLendingOptions(options);
        };

        loadData();
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            {userData && (
                <div className="user-info">
                    <h2>Welcome, {userData.name}</h2>
                    <p>Your balance: {userData.balance} ETH</p>
                </div>
            )}
            <h2>Lending Options</h2>
            <ul>
                {lendingOptions.map(option => (
                    <li key={option.id}>
                        {option.name}: {option.interestRate}%
                    </li>
                ))}
            </ul>
            <LeverageWidget />
        </div>
    );
};

export default Dashboard;