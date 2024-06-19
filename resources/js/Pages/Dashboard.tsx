import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import PortfolioSummary from './Auth/PortfolioSummary';
import HistoricalBars from './Trading/HistoricalBars';
import Icons from '@/Pages/Auth/Icons';
import AlertsManager from './Auth/AlertsManager';
import React, { useState } from 'react';
import { BarData } from '@/types/types';


export default function Dashboard({ auth }: PageProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [purchased, setPurchased] = useState<BarData[]>([]);

  const addFavorite = (symbol: string) => {
    if (!favorites.includes(symbol)) {
      setFavorites([...favorites, symbol]);
      alert(`${symbol} has been added to favorites.`);
    }
  };

  const addPurchase = (stock: BarData) => {
    if (!purchased.some(p => p.symbol === stock.symbol)) {
      setPurchased([...purchased, stock]);
      alert(`${stock.symbol} has been purchased.`);
    }
  };

  const removeFavorite = (symbol: string) => {
    setFavorites(favorites.filter(fav => fav !== symbol));
  };

  const sellAsset = (symbol: string) => {
    setPurchased(purchased.filter(asset => asset.symbol !== symbol));
  };

  return (
    <>
      <AuthenticatedLayout user={auth.user}>
        <Head title="Dashboard" />
        <PortfolioSummary />
        <div className="flex">
          <div className="w-1/5 flex justify-center min-h-screen">
            <Icons />
          </div>
          <div className="w-5/7 py-1 bg-gray-800 min-h-screen p-1 w-9/12 mr-16">
            <div className="grid grid-cols-3 grid-rows-2 gap-4 h-1/3">
              <div className="bg-gray-700 p-4 rounded-lg shadow col-span-1">
                {/* TradingWallet */}
              </div>
              <div className="bg-gray-700 p-4 rounded-lg shadow col-span-1">
                {/* Additional Widget */}
                <div className="bg-gray-800 p-4 rounded-lg shadow mt-4">
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
              <div className="bg-gray-700 p-4 rounded-lg shadow col-span-1">
                {/* Additional Widget */}
                <div className="bg-gray-800 p-4 rounded-lg shadow mt-4">
              <h2 className="text-white text-lg">Assets</h2>
              <ul>
                {purchased.map((asset, index) => (
                  <li key={index} className="text-white flex justify-between">
                    {asset.symbol} - {asset.price}
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
              <div className="col-span-3 bg-gray-700 p-4 rounded-lg shadow h-1/3">
                <HistoricalBars
                  onAddFavorite={addFavorite}
                  onAddPurchase={addPurchase}
                />
              </div>
            </div>


          </div>
        </div>
        <AlertsManager favorites={favorites} purchased={purchased} />
      </AuthenticatedLayout>
    </>
  );
}
