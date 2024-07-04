import React, { useState, useEffect } from 'react';
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useSpring, animated } from 'react-spring';

interface BarData {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

interface CombinedChartProps {
  data: BarData[];
}

const CombinedChart: React.FC<CombinedChartProps> = ({ data }) => {
  // State for filter selection
  const [filterSelection, setFilterSelection] = useState<'day' | 'week' | 'month' | '3 months' | '6 months' | 'year'>('year');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = applyFilter(filterSelection, data);
    setFilteredData(filtered);
  }, [filterSelection, data]);

  // Fonction générique pour appliquer un filtre
  const applyFilter = (type: string, data: BarData[]) => {
    switch (type) {
      case 'day':
        return filterByDay(data);
      case 'week':
        return filterByWeek(data);
      case 'month':
        return filterByMonth(data);
      case '3 months':
        return filterBy3Months(data);
      case '6 months':
        return filterBy6Months(data);
      case 'year':
        return filterByYear(data);
      default:
        return data; // Retourne les données non filtrées si aucun filtre n'est spécifié
    }
  };

  // Fonctions de filtre spécifiques
  const filterByDay = (data: BarData[]) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate.getDate() === yesterday.getDate() &&
        itemDate.getMonth() === yesterday.getMonth() &&
        itemDate.getFullYear() === yesterday.getFullYear();
    });
  };

  const filterByWeek = (data: BarData[]) => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000); // 7 jours plus tard
    return data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfWeek && itemDate <= endOfWeek;
    });
  };

  const filterByMonth = (data: BarData[]) => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Dernier jour du mois actuel
    return data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfMonth && itemDate <= endOfMonth;
    });
  };

  const filterBy3Months = (data: BarData[]) => {
    const today = new Date();
    const startOfPeriod = new Date(today.getFullYear(), today.getMonth() - 2, 1); // 1er jour du mois 3 mois auparavant
    const endOfPeriod = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Dernier jour du mois actuel
    return data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfPeriod && itemDate <= endOfPeriod;
    });
  };

  const filterBy6Months = (data: BarData[]) => {
    const today = new Date();
    const startOfPeriod = new Date(today.getFullYear(), today.getMonth() - 5, 1); // 1er jour du mois 6 mois auparavant
    const endOfPeriod = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Dernier jour du mois actuel
    return data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfPeriod && itemDate <= endOfPeriod;
    });
  };

  const filterByYear = (data: BarData[]) => {
    const today = new Date();
    const startOfPeriod = new Date(today);
    startOfPeriod.setDate(today.getDate() - 365); // Soustrayons 365 jours
    const endOfPeriod = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1); // Hier
    return data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfPeriod && itemDate <= endOfPeriod;
    });
  };

  const formattedData = filteredData.map(bar => ({
    time: new Date(bar.t).toLocaleDateString(),
    open: bar.o,
    high: bar.h,
    low: bar.l,
    close: bar.c,
    volume: bar.v,
  }));

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return num.toString();
    }
  };

  const [chartHeight, setChartHeight] = useState(250); // Hauteur initiale

  const renderTooltipContent = ({ payload, label }: any) => {
    if (payload && payload.length) {
      const { open, high, low, close, volume } = payload[0].payload;
      return (
        <div className="custom-tooltip text-dark-purple" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
          <p>Date: {label}</p>
          <p>Open: {open}</p>
          <p>High: {high}</p>
          <p>Low: {low}</p>
          <p>Close: {close}</p>
          <p>Volume: {formatNumber(volume)}</p>
        </div>
      );
    }
    return null;
  };

  // Animation for the entire chart container
  const props = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } });

  return (
    <animated.div style={props}>
      <div>
        <button className='text-white gap-4 ml-1 p-4 rounded-lg mb-4' onClick={() => setFilterSelection('day')}>1D</button>
        <button className='text-white gap-4 ml-1 p-4 rounded-lg mb-4' onClick={() => setFilterSelection('week')}>1W</button>
        <button className='text-white gap-4 ml-1 p-4 rounded-lg mb-4' onClick={() => setFilterSelection('month')}>1M</button>
        <button className='text-white gap-4 ml-1 p-4 rounded-lg mb-4' onClick={() => setFilterSelection('3 months')}>3M</button>
        <button className='text-white gap-4 ml-1 p-4 rounded-lg mb-4' onClick={() => setFilterSelection('6 months')}>6M</button>
        <button className='text-white gap-4 ml-1 p-4 rounded-lg mb-4' onClick={() => setFilterSelection('year')}>YEAR</button>
      </div>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" tickFormatter={formatNumber} />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip content={renderTooltipContent} />
          <Legend />
          <Bar yAxisId="left" dataKey="volume" fill="#82ca9d" animationDuration={1500} animationEasing="ease-in-out" />
          <Line yAxisId="right" type="monotone" dataKey="close" stroke="#8884d8" animationDuration={1500} animationEasing="ease-in-out" />
        </ComposedChart>
      </ResponsiveContainer>
    </animated.div>
  );
};

export default CombinedChart;
