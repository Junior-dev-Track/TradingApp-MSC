import React from 'react';
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

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
  const formattedData = data.map(bar => ({
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

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="left" tickFormatter={formatNumber} />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip formatter={(value: number) => formatNumber(value)} />
        <Legend />
        <Bar yAxisId="left" dataKey="volume" fill="#82ca9d" />
        <Line yAxisId="right" type="monotone" dataKey="close" stroke="#8884d8" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CombinedChart;
