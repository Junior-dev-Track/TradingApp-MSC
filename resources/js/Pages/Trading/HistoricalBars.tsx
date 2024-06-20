import React, { useState } from 'react';
import { usePage } from "@inertiajs/react";
import CombinedChart from "@/Pages/Auth/CombinedChart";
import SearchBar from "@/Components/SearchBar"; // Assurez-vous que le chemin est correct

interface BarData {
  symbol: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  date: string;
  t: number;
}

const HistoricalBars = () => {
  const { barsData }: { barsData: { original: any } } = usePage().props as unknown as { barsData: { original: any } };
  const [filteredData, setFilteredData] = useState<BarData[]>([]);

  // Convertir les données initiales
  const allData: BarData[] = [];

  if (barsData && barsData.original) {
    Object.keys(barsData.original).forEach(symbol => {
      const data = barsData.original[symbol];

      if (Array.isArray(data)) {
        data.forEach((entry: any) => {
          allData.push({
            symbol: symbol,
            date: new Date(entry.t * 1000).toLocaleDateString(),
            o: entry.o,
            h: entry.h,
            l: entry.l,
            c: entry.c,
            v: entry.v,

            t: entry.t
          });
        });
      } else {
        console.error(`Expected array for ${symbol}, but got ${typeof data}`);

      }
    });
  }

  const handleSearch = (symbol: string) => {
    const data = allData.filter(entry => entry.symbol === symbol);
    setFilteredData(data);
  };

  return (
    <div className="text-white">
      <h2>Historical Bars Data</h2>
      <SearchBar onSearch={handleSearch} />
      {filteredData.length > 0 ? (
        <CombinedChart data={filteredData} />
      ) : (
        <div>No historical data available for this symbol.</div>
      )}
    </div>
  );
};

export default HistoricalBars;
