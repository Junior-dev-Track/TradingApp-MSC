import React, { useState } from 'react';
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {useSpring, animated} from 'react-spring';
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
  const [filterSelection, setFilterSelection] = useState<'day' | 'week' | 'month' | '3 months' |'6 months' |'year' >('year');
  const [filteredData, setFilteredData] = useState(data);

  const filterByDay = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Définit la date à hier
    const filtered = data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate.getDate() === yesterday.getDate() &&
             itemDate.getMonth() === yesterday.getMonth() &&
             itemDate.getFullYear() === yesterday.getFullYear();
    });
    setFilteredData(filtered);
  };

  const filterByWeek = () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000); // 7 days later
    const filtered = data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfWeek && itemDate <= endOfWeek;
    });
    setFilteredData(filtered);
  };

  const filterByMonth = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of current month
    const filtered = data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfMonth && itemDate <= endOfMonth;
    });
    setFilteredData(filtered);
  };

  const filterBy3Months = () => {
    const today = new Date();
    const startOfPeriod = new Date(today.getFullYear(), today.getMonth() - 2, 1); // 1st day of the month 3 months ago
    const endOfPeriod = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month

    const filtered = data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfPeriod && itemDate <= endOfPeriod;
    });

    setFilteredData(filtered);
  };

  const filterBy6Months = () => {
    const today = new Date();
    const startOfPeriod = new Date(today.getFullYear(), today.getMonth() - 5, 1); // 1st day of the month 6 months ago
    const endOfPeriod = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month

    const filtered = data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfPeriod && itemDate <= endOfPeriod;
    });

    setFilteredData(filtered);
  };


  const filterByYear = () => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1); // 1st January of the current year
    const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59); // Last day of December of the current year

    const filtered = data.filter(item => {
      const itemDate = new Date(item.t);
      return itemDate >= startOfYear && itemDate <= endOfYear;
    });

    setFilteredData(filtered);
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
        <div className="custom-tooltip text-dark-purple" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
          <p>Date : {label}</p>
          <p>Open : {open}</p>
          <p>High : {high}</p>
          <p>Low : {low}</p>
          <p>Close : {close}</p>
          <p>Volume : {formatNumber(volume)}</p>
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
    <button className=' text-black gap-4 ml-1 p-4 border border-gray-300 bg-gray-50 rounded-lg mb-4' onClick={() => { setFilterSelection('day'); filterByDay(); }}>Day</button>
    <button className=' text-black gap-4 ml-1 p-4 border border-gray-300 bg-gray-50 rounded-lg mb-4' onClick={() => { setFilterSelection('week'); filterByWeek(); }}>Week</button>
    <button className=' text-black gap-4 ml-1 p-4 border border-gray-300 bg-gray-50 rounded-lg mb-4' onClick={() => { setFilterSelection('month'); filterByMonth(); }}>Month</button>
    <button className=' text-black gap-4 ml-1 p-4 border border-gray-300 bg-gray-50 rounded-lg mb-4' onClick={() => { setFilterSelection('3 months'); filterBy3Months(); }}> 3 Months</button>
    <button className=' text-black gap-4 ml-1 p-4 border border-gray-300 bg-gray-50 rounded-lg mb-4' onClick={() => { setFilterSelection('6 months'); filterBy6Months(); }}>6 Months</button>
    <button className=' text-black gap-4 ml-1 p-4 border border-gray-300 bg-gray-50 rounded-lg mb-4' onClick={() => { setFilterSelection('year'); filterByYear(); }}>Year</button>

    </div>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" tickFormatter={formatNumber} />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip content={renderTooltipContent} />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="volume"
            fill="#82ca9d"
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="close"
            stroke="#8884d8"
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </animated.div>
    );
};

export default CombinedChart;
