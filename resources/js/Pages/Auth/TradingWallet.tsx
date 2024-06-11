import React from 'react';

const TradingWallet = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Trading Wallet</h2>
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 text-white text-center font-bold flex items-center justify-center rounded mr-2">
                    Wallet
                </div>
            </div>
            <div>
                <p>Balance: $10,000</p>
                <p>Recent Transactions:</p>
                <ul className="list-disc pl-5">
                    <li>Buy 0.5 BTC - $25,000</li>
                    <li>Sell 1 ETH - $1,800</li>
                    <li>Buy 100 ADA - $120</li>
                </ul>
            </div>
        </div>
    );
};

export default TradingWallet;
