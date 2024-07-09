import React from "react";

interface PortfolioSummaryProps {
    totalBalance?: number;
    availableBalance?: number;
    investedBalance?: number;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
    totalBalance = 0,
    availableBalance = 0,
    investedBalance = 0,
}) => {
    const getColorClass = (amount: number) => {
        return amount < 1000 ? 'text-violet' : 'text-vert';
    };

    return (
        <div className="portfolio-summary max-w-4xl mx-auto w-4/5 sm:px-6 lg:px-8 text-white overflow-hidden shadow-sm sm:rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 text-white">
                <div className="p-6 border border-gray-300 rounded-lg bg-darker-blue w-full md:w-1/3">
                    <p>Total Balance: <span className={getColorClass(totalBalance)}>${totalBalance.toLocaleString()}</span></p>
                </div>
                <div className="p-6 border border-gray-300 rounded-lg bg-darker-blue w-full md:w-1/3">
                    <p>Available Balance: <span className={getColorClass(availableBalance)}>${availableBalance.toLocaleString()}</span></p>
                </div>
                <div className="p-6 border border-gray-300 rounded-lg bg-darker-blue w-full md:w-1/3">
                    <p>Invested Balance: <span className={getColorClass(investedBalance)}>${investedBalance.toLocaleString()}</span></p>
                </div>
            </div>
        </div>
    );
};

export default PortfolioSummary;
