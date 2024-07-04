import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface BarData {
  t: number; // Assurez-vous que t est en millisecondes ou convertissez-le (*1000 si nécessaire)
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

interface PriceChartProps {
  data: BarData[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  const formattedData = data.map(bar => ({
    time: new Date(bar.t).toLocaleDateString(), // Assurez-vous que 't' est converti correctement
    open: bar.o,
    high: bar.h,
    low: bar.l,
    close: bar.c,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
