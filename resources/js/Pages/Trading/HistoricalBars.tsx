import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import CombinedChart from '@/Pages/Auth/CombinedChart';
import SearchBar from '@/Components/SearchBar';
import { BarData } from '@/types/types';

interface HistoricalBarsProps {
  onAddFavorite: (symbol: string) => void;
  onAddPurchase: (stock: BarData) => void;
}

const HistoricalBars: React.FC<HistoricalBarsProps> = ({ onAddFavorite, onAddPurchase }) => {
  const { barsData }: { barsData: { original: any } } = usePage().props as unknown as { barsData: { original: any } };
  const [filteredData, setFilteredData] = useState<BarData[]>(() => {
    const savedData = localStorage.getItem('filteredData');
    return savedData ? JSON.parse(savedData) : [];
  });

  // Convertir les données initiales
  const allData: BarData[] = [];
  if (barsData && barsData.original) {
    const data = barsData.original;
    Object.keys(data).forEach(symbol => {
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
            price: entry.c // Utilisez le prix de clôture comme prix pour l'achat
          });
        });
      }
    });
  }

  const handleSearch = (symbol: string) => {
    const data = allData.filter(entry => entry.symbol === symbol);
    setFilteredData(data);
  };

  useEffect(() => {
    localStorage.setItem('filteredData', JSON.stringify(filteredData));
  }, [filteredData]);
return (
    <div className="text-white">
      <h2>Historical Bars Data</h2>
      <SearchBar onSearch={handleSearch} />
      {filteredData.length > 0 ? (
        <div>
          <CombinedChart data={filteredData.map(entry => ({
            t: entry.t!,
            o: entry.o!,
            h: entry.h!,
            l: entry.l!,
            c: entry.c!,
            v: entry.v!
          }))} />
          <div className="mt-4">
            <button
              className="bg-blue-500 p-2 rounded mr-2"
              onClick={() => onAddFavorite(filteredData[0].symbol)}
            >
              Add to Favorites
            </button>
            <button
              className="bg-green-500 p-2 rounded"
              onClick={() => onAddPurchase(filteredData[0])}
            >
              Buy
            </button>
          </div>
        </div>
      ) : (
        <div>Aucune donnée historique disponible pour ce symbole.</div>
      )}
    </div>
  );
};

export default HistoricalBars;
