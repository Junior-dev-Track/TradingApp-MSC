import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { PageProps } from "@/types";
import PortfolioSummary from "@/Pages/Auth/PortfolioSummary"; // Import the correct module
import PortfolioDistribution from "@/Pages/Auth/PortfolioDistribution"; // Import the correct module
import HistoricalBars from "./Trading/HistoricalBars";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Icons from "@/Pages/Auth/Icons"; // Comment out the import statement for Icons

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
                    <div>
                        <Icons />
                    </div>
                </section>
                <section>
                    <HistoricalBars />
                </section>
            </AuthenticatedLayout>
        </>
    );
}
