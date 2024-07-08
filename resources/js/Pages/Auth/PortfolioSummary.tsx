import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

// Définissez ici les types pour les props si nécessaire
interface PortfolioSummaryProps {
    totalBalance?: number;
    availableBalance?: number;
    investedBalance?: number;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
    totalBalance = 0, // Valeurs par défaut pour les props
    availableBalance = 0,
    investedBalance = 0,
}) => {
    const getColorClass = (amount: number) => {
        return amount < 1000 ? 'text-violet' : 'text-vert';
    };

    return (
        <div className="portfolio-summary max-w-7xl w-px-50 mx-auto sm:px-6 lg:px-8 text-white overflow-hidden shadow-sm sm:rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
            <div className="flex space-x-6 text-white">
                <div className="ml-1 p-6 border border-gray-300 rounded-lg mb-4 bg-darker-blue">
                    <p>Total Balance: <span className={getColorClass(totalBalance)}>${totalBalance.toLocaleString()}</span></p>
                </div>
                <div className="p-6 border border-gray-300 rounded-lg mb-4 bg-darker-blue">
                    <p>Available Balance: <span className={getColorClass(availableBalance)}>${availableBalance.toLocaleString()}</span></p>
                </div>
                <div className="p-6 border border-gray-300 rounded-lg mb-4 bg-darker-blue">
                    <p>Invested Balance: <span className={getColorClass(investedBalance)}>${investedBalance.toLocaleString()}</span></p>
                </div>
            </div>
        </div>
    );
};

export default PortfolioSummary;
