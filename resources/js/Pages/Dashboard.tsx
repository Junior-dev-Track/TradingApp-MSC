import React, { useState, useEffect, useRef, MouseEvent, ChangeEvent } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import PortfolioSummary from "./Auth/PortfolioSummary";
import Icons from "@/Pages/Auth/Icons";
import HistoricalBars from "./Trading/HistoricalBars";
import { BarData } from "@/types/types";
import { User } from "@/types";
import { MdOutlineRefresh } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

interface PageProps {
  auth?: {
    user?: User;
  };
  onAddSell: (stock: BarData, quantity: number) => void;
}

interface Bar {
  c: number;
}

interface ApiResponse {
  [symbol: string]: Bar[];
}

interface Notification {
  id: number;
  message: string;
  timestamp: Date;
}

export default function Dashboard({ auth, onAddSell }: PageProps = { onAddSell: () => {} }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [purchased, setPurchased] = useState<BarData[]>(() => {
    const savedPurchased = localStorage.getItem("purchased");
    return savedPurchased ? JSON.parse(savedPurchased) : [];
  });

  const [currentPrices, setCurrentPrices] = useState<{ [symbol: string]: number }>({});
  const [availableFunds, setAvailableFunds] = useState<number>(1000);
  const [totalBalance, setTotalBalance] = useState<number>(1000);
  const [showPopup, setShowPopup] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    symbol: "",
    quantity: 1,
    price: 0,
    totalPrice: 0,
  });

  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications).map((notification: any) => ({
      ...notification,
      timestamp: new Date(notification.timestamp)
    })) : [];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      updateCurrentPrices();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("purchased", JSON.stringify(purchased));
  }, [purchased]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const updateCurrentPrices = async () => {
    try {
      const response = await fetch('/api/current-prices');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      const formattedData = Object.fromEntries(
        Object.entries(data).map(([symbol, bars]) => [symbol, bars[0].c])
      );
      setCurrentPrices(formattedData);
      updateNetGainLoss(formattedData);
    } catch (error) {
      console.error('Error fetching current prices:', error);
    }
  };

  const updateNetGainLoss = (prices: { [x: string]: number; }) => {
    const totalInvested = purchased.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
    const currentTotalValue = purchased.reduce((acc, item) => {
      const currentPrice = prices[item.symbol] ?? item.price;
      return acc + currentPrice * (item.quantity ?? 0);
    }, 0);
    const currentNetGainLoss = currentTotalValue - totalInvested;
    setNetGainLoss(currentNetGainLoss);
  };

  const handleBuyClick = () => {
    // Logic for buy click (if needed)
  };

  const handleConfirmSell = async () => {
    try {
      setProcessing(true);
      const response: any = await router.post(`/trade/${formData.symbol}/sell`, {
        quantity: formData.quantity,
        price: formData.price,
      });

      if (response instanceof Error) {
        throw new Error("Network response was not ok");
      }

      const assetToSell = purchased.find(asset => asset.symbol === formData.symbol);
      if (assetToSell) {
        const purchasePrice = assetToSell.price;
        const salePrice = formData.price;
        const gainOrLoss = (salePrice - purchasePrice) * formData.quantity;
        const remainingQuantity = (assetToSell.quantity ?? 0) - formData.quantity;

        if (remainingQuantity > 0) {
          setPurchased(purchased.map(asset =>
            asset.symbol === formData.symbol
              ? { ...asset, quantity: remainingQuantity, totalPrice: remainingQuantity * asset.price }
              : asset
          ));
        } else {
          setPurchased(purchased.filter(asset => asset.symbol !== formData.symbol));
        }

        const fundsFromSale = salePrice * formData.quantity;
        setAvailableFunds(prevFunds => prevFunds + fundsFromSale);
        setTotalBalance(prevBalance => prevBalance + fundsFromSale);
        addNotification(`You have sold ${formData.quantity} shares of ${formData.symbol}.`);
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
    const price = formData.price !== undefined ? formData.price : 0;
    setFormData((prevData) => ({
      ...prevData,
      quantity,
      totalPrice: quantity * price,
    }));
  };

  const addNotification = (message: string) => {
    setNotifications((prevNotifications) => {
      const newNotification: Notification = {
        id: Date.now(),
        message,
        timestamp: new Date(),
      };
      const updatedNotifications = [...prevNotifications, newNotification];
      localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
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
      addNotification(`You have purchased ${quantity} shares of ${stock.symbol}.`);
      setCurrentPrices(prevPrices => ({ ...prevPrices, [stock.symbol]: stock.price }));
      updateNetGainLoss(currentPrices);
    } else {
      addNotification(`Insufficient funds to purchase ${quantity} shares of ${stock.symbol}.`);
    }
  };

  const sellAsset = (symbol: string) => {
    const assetToSell = purchased.find((asset) => asset.symbol === symbol);
    if (assetToSell) {
      setFormData({
        symbol: assetToSell.symbol,
        quantity: assetToSell.quantity ?? 0,
        price: assetToSell.price,
        totalPrice: assetToSell.totalPrice || 0,
      });
      setShowPopup(true);
    }
  };

  const handleSearchChange = (symbol: string) => {
    // Mettre à jour la recherche ici si nécessaire
  };

  const investedBalance = purchased.reduce((acc, asset) => acc + (asset.totalPrice || 0), 0);

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

      <div className="flex">
        <div className="w-1/6 flex justify-center">
          <Icons
            onAppStoreClick={scrollToHistoricalBars}
            onFundClick={scrollToAvailableFunds}
            onAssetsClick={scrollToAssets}
            onFavoritesClick={scrollToFavorites}
          />
        </div>
        <div className="w-3/7 py-1 p-1 w-10/12 mr-16">
          <div className="grid grid-cols-3 gap-4">
            <div
              className={`col-span-3 bg-gray-700 p-3 h-25 rounded-lg shadow ${
                activeSection === "historicalBars" ? "border-4 border-blue-500" : ""
              }`}
              ref={historicalBarsRef}
              style={{ height: "550px" }}
            >
              <HistoricalBars
                onAddFavorite={addFavorite}
                onAddPurchase={addPurchase}
                onSearch={(symbol: string) => handleSearchChange(symbol)}
                selectedSymbol={selectedSymbol}
              />
            </div>
            <div
              className={`bg-gray-700 p-3 rounded-lg shadow h-70 overflow-y-auto col-span-1 ${
                activeSection === "availableFunds" ? "border-4 border-blue-500" : ""
              }`}
              ref={availableFundsRef}
              style={{ height: "100px" }}
            >
              <h2 className="text-white text-lg">Available Funds</h2>
              <div className="text-white">${availableFunds.toFixed(2)}</div>
              <div className={`text-${netGainLoss >= 0 ? "green" : "red"}-500 text-md`}>
                {netGainLoss >= 0 ? `Profit: $${netGainLoss.toFixed(2)}` : `Loss: $${Math.abs(netGainLoss).toFixed(2)}`}
              </div>
            </div>
            <div
              className={`bg-gray-700 p-3 rounded-lg shadow h-30 overflow-y-scroll col-span-2 ${
                activeSection === "favorites" ? "border-2 border-violet" : ""
              }`}
              ref={favoritesRef}
              style={{ maxHeight: "150px", overflowY: "scroll" }}
            >
              <div className="">
                <h2 className="text-white text-lg">Favorites</h2>
                <ul>
                  {favorites.map((symbol, index) => (
                    <li key={index} className="text-red flex justify-between">
                      <button
                        className="text-white"
                        onClick={() => handleFavoriteClick(symbol)}
                      >
                        {symbol}
                      </button>
                      <button
                        className="bg-red-500 p-2 rounded"
                        onClick={() => removeFavorite(symbol)}
                      >
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className={`bg-gray-700 p-3 rounded-lg shadow overflow-y-scroll col-span-3 mb-2 ${
                activeSection === "assets" ? "border-4 border-blue-500" : ""
              }`}
              ref={assetsRef}
              style={{height:"100px", maxHeight: "100px", overflowY: "scroll" }}
            >
              <div className="scrollbar">
                <h2 className="text-white text-lg">Assets</h2>
                <ul>
                  {purchased.map((asset, index) => {
                    const currentPrice = currentPrices[asset.symbol] ?? asset.price;
                    const gainOrLoss = (currentPrice - asset.price) * (asset.quantity ?? 0);
                    return (
                      <li key={index} className="text-white flex justify-between items-center">
                        <span>{asset.symbol} - {asset.quantity} Shares @ ${asset.price.toFixed(2)} each</span>
                        <span>
                          Total: ${(asset.totalPrice || 0).toFixed(2)}
                        </span>
                        <span className={`text-${gainOrLoss >= 0 ? "green" : "red"}-500`}>
                          {gainOrLoss >= 0 ? `+${gainOrLoss.toFixed(2)}` : `${gainOrLoss.toFixed(2)}`}
                        </span>
                        <button
                          className="bg-red-500 p-2 rounded"
                          onClick={() => sellAsset(asset.symbol)}
                        >
                          Sell
                        </button>
                      </li>
                    );
                  })}
                  {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                      <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-black">Confirm Sell</h2>
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
                            onClick={handleConfirmSell}
                            disabled={processing}
                          >
                            Confirm
                          </button>
                          <button className="bg-red-500 text-dark-purple p-2 rounded" onClick={handleCancelSell}>
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
