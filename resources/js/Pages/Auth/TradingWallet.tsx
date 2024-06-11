
import React from 'react';

const TradingWallet = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Trading Wallet</h2>
            <p>Balance: $10,000</p>
            <p>Recent Transactions:</p>
            <ul className="list-disc pl-5">
                <li>Buy 0.5 BTC - $25,000</li>
                <li>Sell 1 ETH - $1,800</li>
                <li>Buy 100 ADA - $120</li>
            </ul>
        </div>
    );
};

export default TradingWallet;
