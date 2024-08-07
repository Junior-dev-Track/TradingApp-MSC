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
  const [chartHeight, setChartHeight] = useState(250); // Hauteur initiale

  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerWidth < 600 ? 200 : 250;
      setChartHeight(newHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const filtered = applyFilter(filterSelection, data);
    setFilteredData(filtered);
  }, [filterSelection, data]);

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
        return data;
    }
  };

  const filterByDay = (data: BarData[]) => {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 48);
    return data.filter(item => new Date(item.t) >= twentyFourHoursAgo);
  };

  const filterByWeek = (data: BarData[]) => {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfWeek && itemDate <= today;
    });
  };

  const filterByMonth = (data: BarData[]) => {
    const today = new Date();
    const startOfPeriod = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
    return data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfPeriod && itemDate <= today;
    });
  };

  const filterBy3Months = (data: BarData[]) => {
    const today = new Date();
    const startOfPeriod = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 90);
    return data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfPeriod && itemDate <= today;
    });
  };

  const filterBy6Months = (data: BarData[]) => {
    const today = new Date();
    const startOfPeriod = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 180);
    return data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfPeriod && itemDate <= today;
    });
  };

  const filterByYear = (data: BarData[]) => {
    const today = new Date();
    const startOfPeriod = new Date(today);
    startOfPeriod.setDate(today.getDate() - 365);
    return data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfPeriod && itemDate <= today;
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

  const renderTooltipContent = ({ payload, label }: any) => {
    if (payload && payload.length) {
      const { open, high, low, close, volume } = payload[0].payload;
      return (
        <div className="p-2 text-dark-purple bg-white border border-gray-300 shadow-md">
          <p className='text-blue-800'>{label}</p>
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


  const props = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } });

  return (
    <animated.div style={props}>
   <div className="flex flex-nowrap justify-end items-center gap-2 mr-4">
  <button className="bg-gray-800 text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded-lg hover:bg-gray-700 transition-colors" onClick={() => setFilterSelection('day')}>1D</button>
  <button className="bg-gray-800 text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded-lg hover:bg-gray-700 transition-colors" onClick={() => setFilterSelection('week')}>1W</button>
  <button className="bg-gray-800 text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded-lg hover:bg-gray-700 transition-colors" onClick={() => setFilterSelection('month')}>1M</button>
  <button className="bg-gray-800 text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded-lg hover:bg-gray-700 transition-colors" onClick={() => setFilterSelection('3 months')}>3M</button>
  <button className="bg-gray-800 text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded-lg hover:bg-gray-700 transition-colors" onClick={() => setFilterSelection('6 months')}>6M</button>
  <button className="bg-gray-800 text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded-lg hover:bg-gray-700 transition-colors" onClick={() => setFilterSelection('year')}>Year</button>
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
