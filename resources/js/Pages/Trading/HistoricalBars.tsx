import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import CombinedChart from "@/Pages/Trading/CombinedChart";
import SearchBar from "@/Components/SearchBar";
import { BarData } from "@/types/types";
import { router } from "@inertiajs/react";
import { MdOutlineRefresh } from "react-icons/md";
import { FaTrash, FaHeart } from 'react-icons/fa';

interface HistoricalBarsProps {
    onAddFavorite: (symbol: string) => void;
    onAddPurchase: (stock: BarData, quantity: number) => void;
    onSearch: (symbol: string) => void;
    selectedSymbol?: string | null;
}

const HistoricalBars: React.FC<HistoricalBarsProps> = ({
    onAddFavorite,
    onAddPurchase,
    onSearch,
    selectedSymbol,
}) => {
    const { barsData }: { barsData: { original: any } } = usePage()
        .props as unknown as { barsData: { original: any } };

    const [filteredData, setFilteredData] = useState<BarData[]>(() => {
        const savedData = localStorage.getItem("filteredData");
        return savedData ? JSON.parse(savedData) : [];
    });
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        symbol: "",
        quantity: 1,
        price: 0,
        totalPrice: 0,
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const allData: BarData[] = [];
    const allSymbols: string[] = [];
    if (barsData && barsData.original) {
        const data = barsData.original;
        Object.keys(data).forEach((symbol) => {
            allSymbols.push(symbol);
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
                        price: entry.c,
                    });
                });
            }
        });
    }

    useEffect(() => {
        if (selectedSymbol) {
            handleSearch(selectedSymbol);
        }
    }, [selectedSymbol]);

    const handleSearch = (symbol: string) => {
        const data = allData.filter((entry) => entry.symbol === symbol);
        setFilteredData(data);
        onSearch(symbol);
    };

    const handleRefresh = () => {
        router.reload({ only: ["barsData"] });
    };

    const handleBuyClick = () => {
        if (filteredData.length > 0) {
            setFormData({
                symbol: filteredData[0].symbol,
                quantity: 1,
                price: filteredData[0].price,
                totalPrice: filteredData[0].price,
            });
            setShowPopup(true);
        }
    };

    const handleConfirmPurchase = async () => {
        try {
            setProcessing(true);
            const response: any = await router.post(
                `/trade/${formData.symbol}/buy`,
                {
                    quantity: formData.quantity,
                    price: formData.price,
                }
            );

            if (response instanceof Error) {
                throw new Error("Network response was not ok");
            }

            onAddPurchase(filteredData[0], formData.quantity);
            setShowPopup(false);
            setProcessing(false);
        } catch (error) {
            console.error("An error occurred during purchase:", error);
            setErrors(["An error occurred during purchase. Please try again."]);
            setShowPopup(false);
            setProcessing(false);
        }
    };

    const handleCancelPurchase = () => {
        setShowPopup(false);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value > 0) {
            setFormData({
                ...formData,
                quantity: value,
                totalPrice: value * formData.price,
            });
        }
    };

    useEffect(() => {
        localStorage.setItem("filteredData", JSON.stringify(filteredData));
    }, [filteredData]);

    return (
        <div className="text-white">
  <div className="flex justify-between mr-10">
    <SearchBar onSearch={handleSearch} allSymbols={allSymbols} />
    <button onClick={handleRefresh}>
        <MdOutlineRefresh className="h-8 w-8 text-white-500 hover:text-gray-700 transition-colors duration-300 mr-6" />
    </button>
</div>
{filteredData.length > 0 ? (
    <div>
       <div className="flex justify-center w-full"> {/* Conteneur Flex pour centrer le span */}
    <span className="text-black p-2 sm:p-3 md:p-4 border border-gray-300 bg-gray-50 rounded-lg mb-4 text-sm sm:text-base md:text-lg">
        {filteredData[0].symbol}
    </span>
</div>

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
        <div className="mt-4 flex justify-start items-center space-x-2">
            <button
                className="bg-darker-blue text-white p-2 rounded hover:bg-gray-600 flex items-center"
                onClick={() => onAddFavorite(filteredData[0].symbol)}
            >
                <FaHeart className="mr-2" /> Add to Favorites
            </button>
            <button
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                onClick={handleBuyClick}
            >
                Buy
            </button>
        </div>
    </div>
) : (
    <div className="text-center">
        Aucune donnée historique disponible pour ce symbole.
    </div>
)}



            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-black">Confirm Purchase</h2>
                        <div className="mt-2">
                            <label className="text-black">Quantity:</label>
                            <input
                                type="number"
                                value={formData.quantity}
                                onChange={handleQuantityChange}
                                className="ml-2 p-1 border rounded text-dark-purple"
                                min="1"
                            />
                        </div>
                        <div className="mt-2 text-black">
                            Total Price: ${formData.totalPrice.toFixed(2)}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-blue-500 text-dark-purple p-2 rounded mr-2"
                                onClick={handleConfirmPurchase}
                                disabled={processing}
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
