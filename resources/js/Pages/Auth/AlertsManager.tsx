import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';

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

  return (
    <div>
      <div className="notifications mt-4">
        <h2>Notifications</h2>
        {notifications.map((notification, index) => (
          <div key={index} className="p-2 mb-2 bg-yellow-200 rounded">
            {notification}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsManager;
