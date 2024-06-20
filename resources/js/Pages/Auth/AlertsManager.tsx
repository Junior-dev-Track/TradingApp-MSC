import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';

interface Stock {
  symbol: string;
  price: number;
}

interface AlertsManagerProps {
  favorites: string[];
  purchased: Stock[];
}

const AlertsManager: React.FC<AlertsManagerProps> = ({ favorites, purchased }) => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const allStocks = [
        ...favorites.map(symbol => ({ symbol, price: Math.random() * 100 })),
        ...purchased
      ];

      allStocks.forEach(stock => {
        const currentPrice = Math.random() * 3000; // Replace with actual price fetching logic

        if (Math.abs(currentPrice - stock.price) / stock.price > 0.05) { // 5% change
          setNotifications(notifications => [
            ...notifications,
            `Alert: ${stock.symbol} price changed significantly. New price: ${currentPrice.toFixed(2)}`
          ]);
        }
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [favorites, purchased]);

  const handleBellClick = () => {
    Inertia.visit('/notifications', { data: { notifications } });
  };

  return (
    <button onClick={handleBellClick} className="text-gray-400 hover:text-gray-500">
      <FaBell className="h-6 w-6" />
    </button>
  );
};

export default AlertsManager;
