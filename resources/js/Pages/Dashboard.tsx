import React, {
    useState,
    useEffect,
    useRef,
    MouseEvent,
    ChangeEvent,
} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import PortfolioSummary from "./Trading/PortfolioSummary";
import Icons from "@/Pages/Auth/Icons";
import HistoricalBars from "./Trading/HistoricalBars";
import { BarData } from "@/types/types";
import { User } from "@/types";
import { MdOutlineRefresh } from "react-icons/md";
import { FaTrash, FaHeart } from "react-icons/fa";

interface PageProps {
    auth?: {
        user?: User; // Marquer la propriété 'user' comme optionnelle
    };
    wallet: number;
    totalAssets: number;
    openTrades: any[];
}

interface Bar {
    c: number; // Close price
    // Ajoutez d'autres propriétés si nécessaire
}

interface ApiResponse {
    [symbol: string]: Bar[];
}

interface Notification {
    id: number;
    message: string;
    timestamp: Date;
}

export default function Dashboard({
    auth,
    wallet,
    totalAssets,
    openTrades,
}: PageProps) {
    const [favorites, setFavorites] = useState<string[]>(() => {
        const savedFavorites = localStorage.getItem("favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [purchased, setPurchased] = useState<BarData[]>(() => {
        const savedPurchased = localStorage.getItem("purchased");
        return savedPurchased ? JSON.parse(savedPurchased) : [];
    });
    const [currentPrices, setCurrentPrices] = useState<{
        [symbol: string]: number;
    }>({});

    const [availableFunds, setAvailableFunds] = useState<number>(wallet);
    const [totalBalance, setTotalBalance] = useState<number>(
        wallet + totalAssets
    );
    const [showPopup, setShowPopup] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [formData, setFormData] = useState({
        symbol: "",
        quantity: 1,
        price: 0,
        totalPrice: 0,
    });

    const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

    const updateNetGainLoss = (prices: { [x: string]: number }) => {
        console.log("Prices:", prices); // Ajoutez cette ligne pour déboguer
        const totalInvested = purchased.reduce(
            (acc, item) => acc + (item.totalPrice || 0),
            0
        );
        const currentTotalValue = purchased.reduce((acc, item) => {
            const currentPrice = prices[item.symbol] ?? item.price;
            return acc + currentPrice * (item.quantity ?? 0);
        }, 0);
        const currentNetGainLoss = currentTotalValue - totalInvested;
        console.log("Net gain/loss:", currentNetGainLoss); // Ajoutez cette ligne pour déboguer
        setNetGainLoss(currentNetGainLoss);
    };

    const handleConfirmSell = async () => {
        try {
            setProcessing(true);
            const response: any = await router.post(
                `/trade/${formData.symbol}/sell`,
                {
                    quantity: formData.quantity,
                    price: formData.price,
                }
            );

            if (response instanceof Error) {
                throw new Error("Network response was not ok");
            }

            // Update state after successful sale
            const assetToSell = purchased.find(
                (asset) => asset.symbol === formData.symbol
            );
            if (assetToSell) {
                const purchasePrice = assetToSell.price;
                const salePrice = formData.price;
                const gainOrLoss =
                    (salePrice - purchasePrice) * formData.quantity;

                const remainingQuantity =
                    (assetToSell.quantity ?? 0) - formData.quantity;

                // Update the asset quantity or remove it if all shares are sold
                if (remainingQuantity > 0) {
                    setPurchased(
                        purchased.map((asset) =>
                            asset.symbol === formData.symbol
                                ? {
                                      ...asset,
                                      quantity: remainingQuantity,
                                      totalPrice:
                                          remainingQuantity * asset.price,
                                  }
                                : asset
                        )
                    );
                } else {
                    setPurchased(
                        purchased.filter(
                            (asset) => asset.symbol !== formData.symbol
                        )
                    );
                }

                const fundsFromSale = salePrice * formData.quantity;
                setAvailableFunds((prevFunds) => prevFunds + fundsFromSale);
                setTotalBalance((prevBalance) => prevBalance + fundsFromSale);
                addNotification(
                    `You have sold ${formData.quantity} shares of ${formData.symbol}.`
                );

                updateNetGainLoss(currentPrices);
                setShowPopup(false);
                setProcessing(false);
            }
        } catch (error) {
            console.error("An error occurred during sale:", error);
            setShowPopup(false);
            setProcessing(false);
        }
    };

    const handleCancelSell = (event: MouseEvent<HTMLButtonElement>) => {
        setShowPopup(false);
    };

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        const quantity = parseInt(event.target.value, 10);
        const price = formData.price !== undefined ? formData.price : 0; // Ensure price is defined
        setFormData((prevData) => ({
            ...prevData,
            quantity,
            totalPrice: quantity * price,
        }));
    };

    const [notifications, setNotifications] = useState<Notification[]>(() => {
        const savedNotifications = localStorage.getItem("notifications");
        return savedNotifications
            ? JSON.parse(savedNotifications).map((notification: any) => ({
                  ...notification,
                  timestamp: new Date(notification.timestamp),
              }))
            : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem("purchased", JSON.stringify(purchased));
    }, [purchased]);

    useEffect(() => {
        localStorage.setItem("notifications", JSON.stringify(notifications));
    }, [notifications]);

    const addNotification = (message: string) => {
        setNotifications((prevNotifications) => {
            const newNotification: Notification = {
                id: Date.now(),
                message,
                timestamp: new Date(),
            };
            const updatedNotifications = [
                ...prevNotifications,
                newNotification,
            ];
            localStorage.setItem(
                "notifications",
                JSON.stringify(updatedNotifications)
            );
            console.log("Added notification:", newNotification); // Log for debugging
            return updatedNotifications;
        });
    };

    const addFavorite = (symbol: string) => {
        if (!favorites.includes(symbol)) {
            setFavorites([...favorites, symbol]);
            addNotification(`${symbol} has been added to favorites.`);
        }
    };

    const addPurchase = (stock: BarData, quantity: number) => {
        const totalPrice = stock.price * quantity;
        if (availableFunds >= totalPrice) {
            const newStock = { ...stock, quantity, totalPrice };
            setPurchased([...purchased, newStock]);
            setAvailableFunds((prevFunds) => prevFunds - totalPrice);
            setTotalBalance((prevBalance) => prevBalance - totalPrice);
            addNotification(
                `You have purchased ${quantity} shares of ${stock.symbol}.`
            );
            setCurrentPrices((prevPrices) => ({
                ...prevPrices,
                [stock.symbol]: stock.price,
            }));
            updateNetGainLoss(currentPrices);
        } else {
            addNotification(
                `Insufficient funds to purchase ${quantity} shares of ${stock.symbol}.`
            );
        }
    };

    const sellAsset = (symbol: string) => {
        const assetToSell = purchased.find((asset) => asset.symbol === symbol);
        if (assetToSell) {
            setFormData({
                symbol: assetToSell.symbol,
                quantity: assetToSell.quantity ?? 0, // Utilisation de ?? pour fournir une valeur par défaut
                price: assetToSell.price,
                totalPrice: assetToSell.totalPrice || 0,
            });
            setShowPopup(true);
        }
    };

    const handleSearchChange = (symbol: string) => {
        // Mettre à jour la recherche ici si nécessaire
    };

    const investedBalance = totalAssets;
    console.log("investedBalance", investedBalance);

    const historicalBarsRef = useRef<HTMLDivElement>(null);
    const availableFundsRef = useRef<HTMLDivElement>(null);
    const assetsRef = useRef<HTMLDivElement>(null);
    const favoritesRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const scrollToHistoricalBars = () => {
        setActiveSection("historicalBars");
        if (historicalBarsRef.current) {
            historicalBarsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToAvailableFunds = () => {
        setActiveSection("availableFunds");
        if (availableFundsRef.current) {
            availableFundsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToAssets = () => {
        setActiveSection("assets");
        if (assetsRef.current) {
            assetsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToFavorites = () => {
        setActiveSection("favorites");
        if (favoritesRef.current) {
            favoritesRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const [netGainLoss, setNetGainLoss] = useState(0);

    useEffect(() => {
        updateNetGainLoss(currentPrices);
    }, [purchased, currentPrices]);

    function removeFavorite(symbol: string): void {
        setFavorites((favorites) => favorites.filter((fav) => fav !== symbol));
        addNotification(`${symbol} has been removed from favorites.`);
    }

    const handleFavoriteClick = (symbol: string) => {
        setSelectedSymbol(symbol);
        if (historicalBarsRef.current) {
            historicalBarsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Dashboard" />
            <div className="mb-10 mt-10">
                <PortfolioSummary
                    totalBalance={totalBalance}
                    availableBalance={availableFunds}
                    investedBalance={investedBalance}
                />
            </div>

            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/6 flex justify-center order-last md:order-first mt-4 md:mt-0">
                    <Icons
                        onAppStoreClick={scrollToHistoricalBars}
                        onFundClick={scrollToAvailableFunds}
                        onAssetsClick={scrollToAssets}
                        onFavoritesClick={scrollToFavorites}
                    />
                </div>
                <div className="w-full md:w-4/5 py-1 p-1 md:mr-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {/* First section - HistoricalBars */}
                        <div className="col-span-1 md:col-span-3 bg-gray-700 p-3 rounded-lg shadow mb-4 md:mb-0">
                            <div
                                className={`${
                                    activeSection === "historicalBars"
                                        ? "border-4 border-blue-500"
                                        : ""
                                }`}
                                ref={historicalBarsRef}
                                style={{ minHeight: "450px" }}
                            >
                                <HistoricalBars
                                    onAddFavorite={addFavorite}
                                    onAddPurchase={addPurchase}
                                    onSearch={(symbol: string) =>
                                        handleSearchChange(symbol)
                                    }
                                    selectedSymbol={selectedSymbol}
                                />
                            </div>
                        </div>

                        {/* Second section - Available Funds */}

                        <div className="space-y-4 col-span-1 bg-gray-700 p-3 rounded-lg shadow">
                            <div
                                className={`${
                                    activeSection === "availableFunds"
                                        ? "border-4 border-blue-500"
                                        : ""
                                }`}
                                ref={availableFundsRef}
                                style={{ height: "100px" }}
                            >
                                <h2 className="text-white text-lg mt-2 ml-2">
                                    Available Funds
                                </h2>
                                <div className="text-violet text-lg font-bold ml-2">
                                    ${availableFunds.toFixed(2)}
                                </div>

                                <div className="text-white text-lg ml-2">
                                    {netGainLoss >= 0
                                        ? `Profit: $${netGainLoss.toFixed(2)}`
                                        : `Loss: $${Math.abs(
                                              netGainLoss
                                          ).toFixed(2)}`}
                                </div>
                            </div>
                        </div>

                        {/* Third section - Favorites */}
                        <div className="col-span-1 md:col-span-2 bg-gray-700 p-4 rounded-lg shadow">
                            <div
                                className={`h-30 overflow-y-scroll ${
                                    activeSection === "favorites"
                                        ? "border-4 border-blue-500"
                                        : ""
                                }`}
                                ref={favoritesRef}
                                style={{ height: "100px", maxHeight: "100px" }}
                            >
                                <h2 className="text-white p-2 rounded hover:bg-gray-600 flex items-center">
                                    <FaHeart className="mr-2" /> Favorites
                                </h2>
                                <ul>
                                    {favorites.map((symbol, index) => (
                                        <li
                                            key={index}
                                            className="text-white flex justify-between ml-2"
                                        >
                                            <button
                                                className="text-white"
                                                onClick={() =>
                                                    handleFavoriteClick(symbol)
                                                }
                                            >
                                                {symbol}
                                            </button>
                                            <button
                                                className="text-white p-2 rounded mr-5"
                                                onClick={() =>
                                                    removeFavorite(symbol)
                                                }
                                            >
                                                <FaTrash />{" "}
                                                {/* Use trash icon */}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Fourth section - Assets */}
                        <div className="col-span-1 md:col-span-3 bg-gray-700 p-3 rounded-lg shadow">
                            <div
                                className={`overflow-y-scroll ${
                                    activeSection === "assets"
                                        ? "border-4 border-blue-500"
                                        : ""
                                }`}
                                ref={assetsRef}
                                style={{ height: "150px", maxHeight: "150px" }}
                            >
                                <h2 className="text-white p-2 rounded hover:bg-gray-600 flex items-center">
                                    Assets
                                </h2>
                                <ul>
                                    {purchased.map((asset, index) => {
                                        const currentPrice =
                                            currentPrices[asset.symbol] ??
                                            asset.price;
                                        const gainOrLoss =
                                            (currentPrice - asset.price) *
                                            (asset.quantity ?? 0);
                                        return (
                                            <li
                                                key={index}
                                                className="text-white flex justify-between items-center ml-2 mr-5"
                                            >
                                                <span>
                                                    {asset.symbol} -{" "}
                                                    {asset.quantity} Shares @ $
                                                    {asset.price.toFixed(2)}{" "}
                                                    each
                                                </span>
                                                <span>
                                                    Total: $
                                                    {asset.totalPrice !==
                                                    undefined
                                                        ? asset.totalPrice.toFixed(
                                                              2
                                                          )
                                                        : "N/A"}
                                                </span>

                                                <span
                                                    className={`text-${
                                                        gainOrLoss >= 0
                                                            ? "green"
                                                            : "red"
                                                    }-500`}
                                                >
                                                    {gainOrLoss >= 0
                                                        ? `+${gainOrLoss.toFixed(
                                                              2
                                                          )}`
                                                        : `${gainOrLoss.toFixed(
                                                              2
                                                          )}`}
                                                </span>
                                                <button
                                                    className="hoover-bg-vert p-2 rounded"
                                                    onClick={() =>
                                                        sellAsset(asset.symbol)
                                                    }
                                                >
                                                    Sell
                                                </button>
                                            </li>
                                        );
                                    })}
                                    {/* Popup for selling */}
                                    {showPopup && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                            <div className="bg-white p-4 rounded shadow-lg">
                                                <h2 className="text-black">
                                                    Confirm Sell
                                                </h2>
                                                <div className="mt-2">
                                                    <label className="text-black">
                                                        Quantity:
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={
                                                            formData.quantity
                                                        }
                                                        onChange={
                                                            handleQuantityChange
                                                        }
                                                        className="ml-2 p-1 border rounded text-dark-purple"
                                                        min="0"
                                                    />
                                                </div>
                                                <div className="mt-2 text-black">
                                                    Total Price: $
                                                    {formData.totalPrice.toFixed(
                                                        2
                                                    )}
                                                </div>
                                                <div className="mt-4 flex justify-end">
                                                    <button
                                                        className="bg-blue-500 text-dark-purple p-2 rounded mr-2"
                                                        onClick={
                                                            handleConfirmSell
                                                        }
                                                        disabled={processing}
                                                    >
                                                        Confirm
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-dark-purple p-2 rounded"
                                                        onClick={
                                                            handleCancelSell
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
