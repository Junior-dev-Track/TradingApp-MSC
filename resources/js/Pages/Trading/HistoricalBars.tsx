import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import CombinedChart from '@/Pages/Auth/CombinedChart';
import SearchBar from '@/Components/SearchBar';
import { BarData } from '@/types/types';

interface HistoricalBarsProps {
  onAddFavorite: (symbol: string) => void;
  onAddPurchase: (stock: BarData) => void;
  onSearch: (symbol: string) => void;
}

const HistoricalBars: React.FC<HistoricalBarsProps> = ({ onAddFavorite, onAddPurchase, onSearch }) => {
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
    onSearch(symbol); // Mettre à jour le symbole de recherche dans le composant parent
  };

  useEffect(() => {
    localStorage.setItem('filteredData', JSON.stringify(filteredData));
  }, [filteredData]);
return (
    <div className="text-white">
      <SearchBar onSearch={handleSearch} />
      {filteredData.length > 0 ? (
        <div>
          <h2>{filteredData[0].symbol}</h2>
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

                {/* STYLE BOUTON HOVER
        <div className="mt-4 w-20
          bg-blue-950 text-blue-500 border border-blue-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md
          hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
            <button
              className=" p-2 rounded mr-2
              bg-blue-500 shadow-blue-500 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50
              group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"
              onClick={() => onAddFavorite(filteredData[0].symbol)}
            > */}
            
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
