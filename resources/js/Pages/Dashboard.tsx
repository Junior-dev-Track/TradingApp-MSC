import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { PageProps } from '@/types';
import PortfolioSummary from '@/Pages/Auth/PortfolioSummary';  // Import the correct module
import PortfolioDistribution from '@/Pages/Auth/PortfolioDistribution';  // Import the correct module
import { Doughnut } from "react-chartjs-2";
import HistoricalBars from '@/Pages/Trading/HistoricalBars';


export default function Dashboard({ auth }: PageProps) {
    return (
        <>
         <AuthenticatedLayout
            user={auth.user}

        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                </div>
            </div>
            <PortfolioSummary  />
            <HistoricalBars  />

        </AuthenticatedLayout>

        </>

    );


}
