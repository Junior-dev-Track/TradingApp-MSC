import React, { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

interface AuthData {
    user: {
        id: number;
        name: string;
    };
}
interface User {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    address: string;
    email: string;
    email_verified_at: string;
}

const Guide: React.FC = () => {
    const auth = usePage().props.auth as AuthData & { user: User };
    const [visibleQuestions, setVisibleQuestions] = useState<number[]>([]);

    const toggleQuestion = (index: number) => {
        setVisibleQuestions(visibleQuestions.includes(index)
            ? visibleQuestions.filter(i => i !== index)
            : [...visibleQuestions, index]);
    };

    const faqItems = [
        {
            question: "What is Trading?",
            answer: (
                <>
                    <p>Trading involves buying and selling financial assets to make a profit. These assets can include stocks, currencies (forex), commodities, cryptocurrencies, and more. The goal is to profit from the price fluctuations of these assets.</p>
                    <h3 className="text-lg font-semibold mt-4 mb-2">1.1 Types of Markets</h3>
                    <ul className="list-disc list-inside">
                        <li><strong>Stock Market</strong>: Buying and selling shares of publicly traded companies.</li>
                        <li><strong>Forex (FX)</strong>: Trading currencies, such as exchanging euros for US dollars.</li>
                        <li><strong>Cryptocurrencies</strong>: Trading digital currencies like Bitcoin and Ethereum.</li>
                        <li><strong>Commodities</strong>: Trading natural resources like gold, silver, and oil.</li>
                        <li><strong>Indices</strong>: Trading baskets of stocks that represent a section of the market, such as the S&P 500.</li>
                    </ul>
                </>
            )
        },
        {
            question: "Basic Trading Concepts",
            answer: (
                <>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Market Orders</h3>
                    <ul className="list-disc list-inside">
                        <li><strong>Market Order</strong>: Buy or sell immediately at the best available price.</li>
                        <li><strong>Limit Order</strong>: Buy or sell at a specific price or better.</li>
                    </ul>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Market Analysis</h3>
                    <ul className="list-disc list-inside">
                        <li><strong>Fundamental Analysis</strong>: Studying financial statements, economic news, and other factors to assess the value of an asset.</li>
                        <li><strong>Technical Analysis</strong>: Using charts and technical indicators to predict price movements.</li>
                    </ul>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Types of Strategies</h3>
                    <ul className="list-disc list-inside">
                        <li><strong>Scalping</strong>: Making many small profits over short periods.</li>
                        <li><strong>Day Trading</strong>: Buying and selling assets within the same day.</li>
                        <li><strong>Swing Trading</strong>: Holding positions for several days to weeks.</li>
                        <li><strong>Long-Term Investing</strong>: Holding assets for months or years.</li>
                    </ul>
                </>
            )
        },
        {
            question: "Risk Management",
            answer: (
                <>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Diversification</h3>
                    <p>Don't put all your eggs in one basket. Invest in different types of assets to reduce risk.</p>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Using Stop-Loss Orders</h3>
                    <p>A stop-loss order allows you to set a price at which your position will automatically be closed to prevent excessive losses.</p>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Position Sizing</h3>
                    <p>Only invest a small portion of your total capital on a single trade. A common rule is to risk only 1-2% of your capital per trade.</p>
                </>
            )
        },
        {
            question: "Using Our Trading Platform",
            answer: (
                <>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Using the Fictitious €2000</h3>
                    <ul className="list-disc list-inside">
                        <li>Go to the "Portfolio" section to see your fictitious amount.</li>
                        <li>Start by exploring the different markets available on the platform.</li>
                        <li>Select a market and place an order (market or limit) using the fictitious amount.</li>
                    </ul>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Tracking and Analysis</h3>
                    <ul className="list-disc list-inside">
                        <li>Use the charts and technical analysis tools provided by the platform.</li>
                        <li>Track your performance in the "Transaction History" section.</li>
                        <li>Adjust your strategies based on the results obtained.</li>
                    </ul>
                </>
            )
        },
        {
            question: "What is a limit order?",
            answer: (
                    <p>A limit order is a type of order that allows a trader to buy or sell an asset at a specific price or better.
                        When a limit order is placed, it remains active until the market reaches the specified price, and the order is then
                        executed automatically.</p>
            )
        },
        {
            question: "What is a stop loss?",
            answer: (
                    <p>
                    A stop-loss is an automatic order that limits the potential losses of an open position. It is placed at a specific price
                    level, and if the market reaches this level, the stop-loss order is executed, closing the position to limit the losses.</p>
            )
        },
        {
            question: "What is take-profit?",
            answer: (
                    <p>
                    A take-profit is an automatic order that closes an open position when the market reaches a predetermined price level,
                    thereby locking in the profits. This allows the trader to exit the position with a gain before the market changes
                    direction.</p>
            )
        }
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Comprehensive Beginner's Guide to Trading" />
            <div className="p-10 font-sans text-gray-200 w-5/6 m-auto">

                <h1 className="text-2xl font-bold mb-4">
                    Comprehensive Beginner's Guide to Trading
                </h1>

                {faqItems.map((item, index) => (
                    <section key={index} className="mb-6">
                        <div className="border border-gray-800 rounded shadow-lg p-6">
                            <div onClick={() => toggleQuestion(index)} className="cursor-pointer">
                                <h2 className="text-xl font-semibold mb-2">{item.question}</h2>
                            </div>
                            {visibleQuestions.includes(index) && (
                                <div>{item.answer}</div>
                            )}
                        </div>
                    </section>
                ))}

                <section className="mb-8">
                    <div className="border border-gray-800 rounded shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
                        <p>Trading can be an exciting and potentially lucrative activity, but it carries risks. By following this guide, you will be better prepared to navigate the world of trading. Use our platform responsibly, and remember that practice is essential to becoming a competent trader. Good luck and happy trading!</p>
                    </div>
                </section>

            </div>
        </AuthenticatedLayout>
    );
};

export default Guide;
