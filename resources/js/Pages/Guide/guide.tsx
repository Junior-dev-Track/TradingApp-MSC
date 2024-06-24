import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

interface AuthData {
    user: {
        // Define the properties of the 'user' object here
        // For example:
        id: number;
        name: string;
        // ...
    };
    // Add other properties of the 'auth' object here if needed
}
interface User {
    // Define the properties of the 'User' object here
    // For example:
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    address: string;
    email: string;
    email_verified_at: string;
    // ...
}

const Guide: React.FC = () => {

    const auth = usePage().props.auth as AuthData & { user: User };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Comprehensive Beginner's Guide to Trading" />
            <div className="p-10 font-sans text-gray-200 w-5/6 m-auto">

                <h1 className="text-2xl font-bold mb-4">
                    Comprehensive Beginner's Guide to Trading
                </h1>

                <section className="mb-6">
                    <div className="max-w-sm w-full lg:max-w-full lg:flex">
                        <div className="border border-gray-800 rounded shadow-lg p-6 w-full lg:flex-1">
                            <h2 className="text-xl font-semibold mb-2">Introduction</h2>
                            <p>Welcome to our educational trading platform! Whether you are completely new to the world of trading or just need a refresher, this guide will help you understand the basics of trading and start using our app with a fictitious amount of €2000 to practice.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-6">
                    <div className="max-w-sm w-full lg:max-w-full lg:flex">
                        <div className="border border-gray-800 rounded shadow-lg p-6 w-full lg:flex-1">
                            <h2 className="text-xl font-semibold mb-2">1. What is Trading?</h2>
                            <p>Trading involves buying and selling financial assets to make a profit. These assets can include stocks, currencies (forex), commodities, cryptocurrencies, and more. The goal is to profit from the price fluctuations of these assets.</p>

                            <h3 className="text-lg font-semibold mt-4 mb-2">1.1 Types of Markets</h3>
                            <ul className="list-disc list-inside">
                                <li><strong>Stock Market</strong>: Buying and selling shares of publicly traded companies.</li>
                                <li><strong>Forex (FX)</strong>: Trading currencies, such as exchanging euros for US dollars.</li>
                                <li><strong>Cryptocurrencies</strong>: Trading digital currencies like Bitcoin and Ethereum.</li>
                                <li><strong>Commodities</strong>: Trading natural resources like gold, silver, and oil.</li>
                                <li><strong>Indices</strong>: Trading baskets of stocks that represent a section of the market, such as the S&P 500.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-6">
                    <div className="max-w-sm w-full lg:max-w-full lg:flex">
                        <div className="border border-gray-800 rounded shadow-lg p-6 w-full lg:flex-1">
                            <h2 className="text-xl font-semibold mb-2">2. Basic Trading Concepts</h2>

                            <h3 className="text-lg font-semibold mt-4 mb-2">2.1 Market Orders</h3>
                            <ul className="list-disc list-inside">
                                <li><strong>Market Order</strong>: Buy or sell immediately at the best available price.</li>
                                <li><strong>Limit Order</strong>: Buy or sell at a specific price or better.</li>
                            </ul>

                            <h3 className="text-lg font-semibold mt-4 mb-2">2.2 Market Analysis</h3>
                            <ul className="list-disc list-inside">
                                <li><strong>Fundamental Analysis</strong>: Studying financial statements, economic news, and other factors to assess the value of an asset.</li>
                                <li><strong>Technical Analysis</strong>: Using charts and technical indicators to predict price movements.</li>
                            </ul>

                            <h3 className="text-lg font-semibold mt-4 mb-2">2.3 Types of Strategies</h3>
                            <ul className="list-disc list-inside">
                                <li><strong>Scalping</strong>: Making many small profits over short periods.</li>
                                <li><strong>Day Trading</strong>: Buying and selling assets within the same day.</li>
                                <li><strong>Swing Trading</strong>: Holding positions for several days to weeks.</li>
                                <li><strong>Long-Term Investing</strong>: Holding assets for months or years.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-6">
                    <div className="max-w-sm w-full lg:max-w-full lg:flex">
                        <div className="border border-gray-800 rounded shadow-lg p-6 w-full lg:flex-1">
                            <h2 className="text-xl font-semibold mb-2">3. Risk Management</h2>

                            <h3 className="text-lg font-semibold mt-4 mb-2">3.1 Diversification</h3>
                            <p>Don't put all your eggs in one basket. Invest in different types of assets to reduce risk.</p>

                            <h3 className="text-lg font-semibold mt-4 mb-2">3.2 Using Stop-Loss Orders</h3>
                            <p>A stop-loss order allows you to set a price at which your position will automatically be closed to prevent excessive losses.</p>

                            <h3 className="text-lg font-semibold mt-4 mb-2">3.3 Position Sizing</h3>
                            <p>Only invest a small portion of your total capital on a single trade. A common rule is to risk only 1-2% of your capital per trade.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-6">
                    <div className="max-w-sm w-full lg:max-w-full lg:flex">
                        <div className="border border-gray-800 rounded shadow-lg p-6 w-full lg:flex-1">
                            <h2 className="text-xl font-semibold mb-2">4. Using Our Trading Platform</h2>

                            <h3 className="text-lg font-semibold mt-4 mb-2">4.1 Creating an Account</h3>
                            <ul className="list-disc list-inside">
                                <li>Download the app from our website or the App Store.</li>
                                <li>Create an account by providing your personal information.</li>
                                <li>Log in to your account.</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-4 mb-2">4.2 Using the Fictitious €2000</h3>
                            <ul className="list-disc ml-6">
                                <li>Go to the "Portfolio" section to see your fictitious amount.</li>
                                <li>Start by exploring the different markets available on the platform.</li>
                                <li>Select a market and place an order (market or limit) using the fictitious amount.</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-4 mb-2">4.3 Tracking and Analysis</h3>
                            <ul className="list-disc ml-6">
                                <li>Use the charts and technical analysis tools provided by the platform.</li>
                                <li>Track your performance in the "Transaction History" section.</li>
                                <li>Adjust your strategies based on the results obtained.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <div className="max-w-sm w-full lg:max-w-full lg:flex">
                        <div className="border border-gray-800 rounded shadow-lg p-6 w-full lg:flex-1">
                            <h2 className="text-2xl font-semibold mb-4">5. Tips for Beginners</h2>
                            <ul className="list-disc ml-6">
                                <li><strong>Start Small</strong>: Don’t rush. Use small amounts initially to understand how the market works.</li>
                                <li><strong>Continue Educating Yourself</strong>: Trading is a constantly evolving field. Read books, take online courses, and stay informed about economic news.</li>
                                <li><strong>Stay Calm and Patient</strong>: Markets can be volatile. Don’t let your emotions dictate your trading decisions.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <div className="max-w-sm w-full lg:max-w-full lg:flex">
                        <div className="border border-gray-800 rounded shadow-lg p-6 w-full lg:flex-1">
                            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
                            <p>Trading can be an exciting and potentially lucrative activity, but it carries risks. By following this guide, you will be better prepared to navigate the world of trading. Use our platform responsibly, and remember that practice is essential to becoming a competent trader. Good luck and happy trading!</p>
                        </div>
                    </div>
                </section>

            </div>
        </AuthenticatedLayout>
    );
};

export default Guide;
