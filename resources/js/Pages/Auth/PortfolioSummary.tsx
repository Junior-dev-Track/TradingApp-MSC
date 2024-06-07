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
        <div className="portfolio-summary max-w-7xl w:px-50 mx-auto sm:px-6 lg:px-8 text-dark-blue bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <h2>État du Portefeuille</h2>
            <p>Solde Total: ${totalBalance.toLocaleString()}</p>
            <p>Solde Disponible: ${availableBalance.toLocaleString()}</p>
            <p>Solde Investi: ${investedBalance.toLocaleString()}</p>
            {/* Ajoutez d'autres détails et visualisations selon le besoin */}
        </div>
    );
}

export default PortfolioSummary;
