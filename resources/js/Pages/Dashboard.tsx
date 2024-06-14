import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { PageProps } from '@/types';
import PortfolioSummary from '@/Pages/Auth/PortfolioSummary';  // Import the correct module
import PortfolioDistribution from '@/Pages/Auth/PortfolioDistribution';  // Import the correct module
import HistoricalBars from './Trading/HistoricalBars';
/**import TradingWallet from '@/Pages/Auth/TradingWallet'; // Import the TradingWallet component */





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

                <section>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="">
                        {/**<TradingWallet /> */}
                        </div>
                        <div className="">
                            {/* Placeholder for another component */}
                            <HistoricalBars />
                        </div>
                        <div className="">
                            {/* Placeholder for another component */}
                        </div>
                        <div className="">
                            {/* Placeholder for another component */}
                        </div>
                        <div className="">
                            {/* Placeholder for another component */}
                        </div>
                        <div className="">
                            {/* Placeholder for another component */}
                        </div>
                    </div>
                </section>

            </AuthenticatedLayout>
        </>
    );
}
