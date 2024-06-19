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
              </div>
              <div className="bg-gray-700 p-4 rounded-lg shadow col-span-1">
                {/* Additional Widget */}
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
