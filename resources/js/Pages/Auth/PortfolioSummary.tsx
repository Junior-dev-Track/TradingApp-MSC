import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

// Définissez ici les types pour les props si nécessaire
interface PortfolioSummaryProps {
  totalBalance?: number;
  availableBalance?: number;
  investedBalance?: number;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  totalBalance = 0, // Valeurs par défaut pour les props
  availableBalance = 0,
  investedBalance = 0
}) => {
    return (
        <div className="flex justify-center portfolio-summary max-w-7xl w-px-50 mx-auto sm:px-6 lg:px-8 text-dark-blue bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <h2 className="text-2xl font-bold mb-4">État du Portefeuille</h2>
        <div className="p-4 border border-gray-300 bg-gray-50 rounded-lg mb-4">
            <p>Solde Total: ${totalBalance.toLocaleString()}</p>
        </div>
        <div className="p-4 border border-gray-300 bg-gray-50 rounded-lg mb-4">
            <p>Solde Disponible: ${availableBalance.toLocaleString()}</p>
        </div>
        <div className="p-4 border border-gray-300 bg-gray-50 rounded-lg mb-4">
            <p>Solde Investi: ${investedBalance.toLocaleString()}</p>
        </div>
        {/* Ajoutez d'autres détails et visualisations selon le besoin */}
    </div>

    );
}

export default PortfolioSummary;
