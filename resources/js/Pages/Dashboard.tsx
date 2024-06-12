import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { PageProps } from '@/types';
import PortfolioSummary from '@/Pages/Auth/PortfolioSummary';  // Import the correct module
import PortfolioDistribution from '@/Pages/Auth/PortfolioDistribution';  // Import the correct module
// import TradingWallet from '@/Pages/Auth/TradingWallet'; // Import the TradingWallet component
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';




export default function Dashboard({ auth }: PageProps) {
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Dashboard" />

                <div className="py-3">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/* Content here */}
                    </div>
                </div>

                <section>
                    <div>
                        <PortfolioSummary />
                    </div>
                </section>

               
            </AuthenticatedLayout>
        </>
    );
}
