import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import PortfolioDistribution from '@/Pages/Auth/PortfolioDistribution';
import PortfolioSummary from './Auth/PortfolioSummary';
import HistoricalBars from './Trading/HistoricalBars';
import TradingWallet from './Auth/TradingWallet';
import Icons from '@/Pages/Auth/Icons';

export default function Dashboard({ auth }: PageProps) {
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Dashboard" />
< PortfolioSummary />
                <div className="flex"> {/* Ajustement pour un espace vide sur le côté gauche */}
                    <div className=" ml-10 mt-20 flex  min-h-screen"> {/* Container for Icons, centered */}
                        <Icons />
                    </div>

                    <div className="w-5/7 py-1 bg-gray-800 min-h-screen p-1 w-9/12 ml-20  h-3/5">  {/* Adjusted global container size */}
                        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-3/5">
                            {/* Main content widgets */}
                            {/* First Row */}
                            <div className="bg-gray-700 p-4 rounded-lg shadow col-span-1 ">
                                 <TradingWallet />
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg shadow col-span-1">

                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg shadow col-span-1">
                                {/* Additional Widget or Space for Expansion */}
                            </div>

                            {/* Second Row */}
                            <div className="col-span-3 bg-gray-700 p-4 rounded-lg shadow  h-3/5">
                                <HistoricalBars />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
