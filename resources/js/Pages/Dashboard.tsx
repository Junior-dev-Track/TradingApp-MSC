import React, { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PortfolioSummary from "./Auth/PortfolioSummary";
import Icons from "@/Pages/Auth/Icons";
import AlertsManager from "@/Pages/Auth/AlertsManager";
import Notifications from "@/Pages/Auth/Notifications";
import HistoricalBars from "./Trading/HistoricalBars";
import { BarData } from "@/types/types";
import { User } from "@/types";

interface PageProps {
  auth?: {
    user?: User; // Marquer la propriété 'user' comme optionnelle
  };
}

export default function Dashboard({ auth }: PageProps = {}) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [purchased, setPurchased] = useState<BarData[]>(() => {
    const savedPurchased = localStorage.getItem("purchased");
    return savedPurchased ? JSON.parse(savedPurchased) : [];
  });

  // Simuler l'état de l'argent disponible
  const [availableFunds, setAvailableFunds] = useState<number>(1000);
  const [totalBalance, setTotalBalance] = useState<number>(1000);

  // State pour les notifications
  const [notifications, setNotifications] = useState<string[]>(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  // Effet pour sauvegarder les favoris dans localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Effet pour sauvegarder les achats dans localStorage
  useEffect(() => {
    localStorage.setItem("purchased", JSON.stringify(purchased));
  }, [purchased]);

  // Effet pour sauvegarder les notifications dans localStorage
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Fonction pour ajouter une notification
  const addNotification = (message: string) => {
    setNotifications((prevNotifications) => [...prevNotifications, message]);
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
      setAvailableFunds(prevFunds => prevFunds - totalPrice);
      setTotalBalance(prevBalance => prevBalance - totalPrice);
      addNotification(`${quantity} shares of ${stock.symbol} have been purchased.`);
      updateNetGainLoss();
    } else {
      addNotification(`Insufficient funds to purchase ${quantity} shares of ${stock.symbol}.`);
    }
  };

  const sellAsset = (symbol: string) => {
    const assetToSell = purchased.find(asset => asset.symbol === symbol);
    if (assetToSell) {
      setAvailableFunds(prevFunds => prevFunds + (assetToSell.totalPrice || 0));
      setTotalBalance(prevBalance => prevBalance + (assetToSell.totalPrice || 0));
      setPurchased(purchased.filter(asset => asset.symbol !== symbol));
      addNotification(`${assetToSell.symbol} has been sold.`);
      updateNetGainLoss();
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
    setActiveSection('historicalBars');
    if (historicalBarsRef.current) {
      historicalBarsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAvailableFunds = () => {
    setActiveSection('availableFunds');
    if (availableFundsRef.current) {
      availableFundsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAssets = () => {
    setActiveSection('assets');
    if (assetsRef.current) {
      assetsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFavorites = () => {
    setActiveSection('favorites');
    if (favoritesRef.current) {
      favoritesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // État pour suivre le gain ou la perte nette
const [netGainLoss, setNetGainLoss] = useState(0);

const updateNetGainLoss = () => {
  const totalInvested = purchased.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  const initialFunds = 1000; // Assumons que le fonds initial est de 1000
  const currentNetGainLoss = availableFunds + totalInvested - initialFunds;
  setNetGainLoss(currentNetGainLoss);
};

useEffect(() => {
  updateNetGainLoss();
}, [purchased, availableFunds]);





    function removeFavorite(symbol: string): void {
        throw new Error("Function not implemented.");
    }

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
              className={`col-span-3 bg-gray-700 p-3 h-15 rounded-lg shadow ${activeSection === 'historicalBars' ? 'border-4 border-blue-500' : ''}`}
              ref={historicalBarsRef}
            >
              <HistoricalBars
                onAddFavorite={addFavorite}
                onAddPurchase={addPurchase}
                onSearch={(symbol: string) => handleSearchChange(symbol)}
              />
            </div>
            <div
  className={`bg-gray-700 p-3 rounded-lg shadow h-30 overflow-y-hidden col-span-1 ${activeSection === 'availableFunds' ? 'border-4 border-blue-500' : ''}`}
  ref={availableFundsRef}
>
  <h2 className="text-white text-lg">Available Funds</h2>
  <div className="text-white">${availableFunds.toFixed(2)}</div>
  <div className={`text-${netGainLoss >= 0 ? 'green' : 'red'}-500 text-md`}>
    {netGainLoss >= 0 ? 'Profit' : 'Loss'}: ${Math.abs(netGainLoss).toFixed(2)}
  </div>
</div>

            <div
              className={`bg-gray-700 p-3 rounded-lg shadow h-30 overflow-y-auto col-span-2 ${activeSection === 'favorites' ? 'border-4 border-blue-500' : ''}`}
              ref={favoritesRef}
              style={{ maxHeight: '300px' }}
            >
              {/* Additional Widget */}
              <div className="bg-gray-800 p-3 rounded-lg shadow mt-4">
                <h2 className="text-white text-lg">Favorites</h2>
                <ul>
                  {favorites.map((symbol, index) => (
                    <li key={index} className="text-red flex justify-between">
                      {symbol}
                      <button
                        className="bg-red-500 p-2 rounded"
                        onClick={() => removeFavorite(symbol)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className={`bg-gray-700 p-3 rounded-lg shadow h-30 overflow-y-auto col-span-3 ${activeSection === 'assets' ? 'border-4 border-blue-500' : ''}`}
              ref={assetsRef}
              style={{ maxHeight: '300px' }}
            >
              {/* Additional Widget */}
              <div className="bg-gray-800 p-4 rounded-lg shadow mt-4">
                <h2 className="text-white text-lg">Assets</h2>
                <ul>
                  {purchased.map((asset, index) => (
                    <li key={index} className="text-white flex justify-between">
                      {asset.symbol} - {asset.quantity} shares @ ${asset.price.toFixed(2)} each - Total: ${(asset.totalPrice || 0).toFixed(2)}
                      <button
                        className="bg-red-500 p-2 rounded"
                        onClick={() => sellAsset(asset.symbol)}
                      >
                        Sell
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
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
      {/* Affichage du composant Notifications */}
    </AuthenticatedLayout>
  );
}
