import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import CombinedChart from "@/Pages/Auth/CombinedChart";
import SearchBar from "@/Components/SearchBar";
import { BarData } from "@/types/types";
import { router } from "@inertiajs/react";
import { MdOutlineRefresh } from "react-icons/md";
import { ErrorBag } from "@inertiajs/inertia";

interface HistoricalBarsProps {
    onAddFavorite: (symbol: string) => void;
    onAddPurchase: (stock: BarData, quantity: number) => void;
    onSearch: (symbol: string) => void;
}

const HistoricalBars: React.FC<HistoricalBarsProps> = ({
    onAddFavorite,
    onAddPurchase,
    onSearch,
}) => {
    const { barsData }: { barsData: { original: any } } = usePage()
        .props as unknown as { barsData: { original: any } };
    const [filteredData, setFilteredData] = useState<BarData[]>(() => {
        const savedData = localStorage.getItem("filteredData");
        return savedData ? JSON.parse(savedData) : [];
    });
    const [showPopup, setShowPopup] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Convertir les données initiales
    const allData: BarData[] = [];
    if (barsData && barsData.original) {
        const data = barsData.original;
        Object.keys(data).forEach((symbol) => {
            const symbolData = data[symbol];
            if (symbolData && Array.isArray(symbolData)) {
                symbolData.forEach((entry: any) => {
                    allData.push({
                        symbol: symbol,
                        date: new Date(entry.t * 1000).toLocaleDateString(),
                        o: entry.o,
                        h: entry.h,
                        l: entry.l,
                        c: entry.c,
                        v: entry.v,
                        t: entry.t,
                        price: entry.c, // Utilisez le prix de clôture comme prix pour l'achat
                    });
                });
            }
        });
    }

    const handleSearch = (symbol: string) => {
        const data = allData.filter((entry) => entry.symbol === symbol);
        setFilteredData(data);
        onSearch(symbol); // Mettre à jour le symbole de recherche dans le composant parent
    };

    const handleRefresh = () => {
        router.reload({ only: ["barsData"] });
    };

    const handleBuyClick = () => {
        setShowPopup(true);
    };

    const handleConfirmPurchase = () => {
        if (filteredData.length > 0) {
            onAddPurchase(filteredData[0], quantity);
        }
        setShowPopup(false);
    };

    const handleCancelPurchase = () => {
        setShowPopup(false);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    useEffect(() => {
        localStorage.setItem("filteredData", JSON.stringify(filteredData));
    }, [filteredData]);

    const totalPrice = filteredData.length > 0 ? (filteredData[0].price * quantity).toFixed(2) : 0;

    return (
        <div className="text-white">
            <div className="flex justify-between mr-10">
                <SearchBar onSearch={handleSearch} />
                <button onClick={handleRefresh}>
                    <MdOutlineRefresh className="h-8 w-8 text-white-500 hover:text-gray-700 transition-colors duration-300 mr-5" />
                </button>
            </div>
            {filteredData.length > 0 ? (
                <div>
                    <h2>{filteredData[0].symbol}</h2>
                    <CombinedChart
                        data={filteredData.map((entry) => ({
                            t: entry.t!,
                            o: entry.o!,
                            h: entry.h!,
                            l: entry.l!,
                            c: entry.c!,
                            v: entry.v!,
                        }))}
                    />
                    <div className="mt-4">
                        <button
                            className="bg-blue-500 p-2 rounded mr-2"
                            onClick={() =>
                                onAddFavorite(filteredData[0].symbol)
                            }
                        >
                            Add to Favorites
                        </button>
                        <button
                            className="bg-green-500 p-2 rounded"
                            onClick={handleBuyClick}
                        >
                            Buy
                        </button>
                    </div>
                </div>
            ) : (
                <div>Aucune donnée historique disponible pour ce symbole.</div>
            )}

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-black">Confirm Purchase</h2>
                        <div className="mt-2">
                            <label className="text-black">Quantity:</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="ml-2 p-1 border rounded text-dark-purple"
                                min="1"
                            />
                        </div>
                        <div className="mt-2 text-black">
                            Total Price: ${totalPrice}
                        </div>
                        <div className="mt-4">
                            <button
                                className="bg-blue-500 text-dark-purple p-2 rounded mr-2"
                                onClick={handleConfirmPurchase}
                            >
                                Confirm
                            </button>
                            <button
                                className="bg-red-500 text-dark-purple p-2 rounded"
                                onClick={handleCancelPurchase}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoricalBars;
