// Dashboard.tsx

import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PortfolioSummary from "./Auth/PortfolioSummary";
import Icons from "@/Pages/Auth/Icons";
import AlertsManager from "@/Pages/Auth/AlertsManager"; // Import the AlertsManager component

import HistoricalBars from "./Trading/HistoricalBars";
import { BarData } from "@/types/types";

interface PageProps {
    auth: any; // Remplacez 'any' par le type approprié pour 'auth'
}

export default function Dashboard({ auth }: PageProps) {
    const [favorites, setFavorites] = useState<string[]>(() => {
        const savedFavorites = localStorage.getItem("favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [purchased, setPurchased] = useState<BarData[]>(() => {
        const savedPurchased = localStorage.getItem("purchased");
        return savedPurchased ? JSON.parse(savedPurchased) : [];
    });
    const [searchSymbol, setSearchSymbol] = useState<string>("");

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem("purchased", JSON.stringify(purchased));
    }, [purchased]);

    const addFavorite = (symbol: string) => {
        if (!favorites.includes(symbol)) {
            setFavorites([...favorites, symbol]);
            alert(`${symbol} has been added to favorites.`);
        }
    };

    const addPurchase = (stock: BarData) => {
        if (!purchased.some((p) => p.symbol === stock.symbol)) {
            setPurchased([...purchased, stock]);
            alert(`${stock.symbol} has been purchased.`);
        }
    };

    const removeFavorite = (symbol: string) => {
        setFavorites(favorites.filter((fav) => fav !== symbol));
    };

    const sellAsset = (symbol: string) => {
        setPurchased(purchased.filter((asset) => asset.symbol !== symbol));
    };

    const handleSearchChange = (symbol: string) => {
        setSearchSymbol(symbol);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="mb-10 mt-10">
                <PortfolioSummary />
            </div>

            <div className="flex">
                <div className="w-1/6 flex justify-center">
                    <Icons />
                </div>
                <div className="w-3/7 py-1 p-1 w-10/12 mr-16">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-700 p-3 rounded-lg shadow h-64 overflow-y-auto col-span-1">
                            {/* TradingWallet */}
                        </div>
                        <div className="bg-gray-700 p-3 rounded-lg shadow h-64 overflow-y-auto col-span-2">
                            {/* Additional Widget */}
                            <div className="bg-gray-800 p-3 rounded-lg shadow mt-4">
                                <h2 className="text-white text-lg">
                                    Favorites
                                </h2>
                                <ul>
                                    {favorites.map((symbol, index) => (
                                        <li
                                            key={index}
                                            className="text-red flex justify-between"
                                        >
                                            {symbol}
                                            <button
                                                className="bg-red-500 p-2 rounded"
                                                onClick={() =>
                                                    removeFavorite(symbol)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gray-700 p-3 rounded-lg shadow h-64 overflow-y-auto col-span-3">
                            {/* Additional Widget */}
                            <div className="bg-gray-800 p-4 rounded-lg shadow mt-4">
                                <h2 className="text-white text-lg">Assets</h2>
                                <ul>
                                    {purchased.map((asset, index) => (
                                        <li
                                            key={index}
                                            className="text-white flex justify-between"
                                        >
                                            {asset.symbol} - {asset.price}
                                            <button
                                                className="bg-red-500 p-2 rounded"
                                                onClick={() =>
                                                    sellAsset(asset.symbol)
                                                }
                                            >
                                                Sell
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-span-3 bg-gray-700 p-4 rounded-lg shadow">
                            <HistoricalBars
                                onAddFavorite={addFavorite}
                                onAddPurchase={addPurchase}
                                onSearch={(symbol: string) =>
                                    handleSearchChange(symbol)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Intégration d'AlertsManager avec les props favorites et purchased */}
            <AlertsManager
                executeOrder={false}
                priceAlerts={[]}
                marketNews={false}
                accountStatus={false}
                marketMovements={false}
                dividends={false}
                accountSecurity={false}
                supportMessages={false}
                assetMovements={false}
                deadlines={false}
            />
        </AuthenticatedLayout>
    );
}
