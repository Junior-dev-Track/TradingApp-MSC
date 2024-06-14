import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface BarData {
  t: number;
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
    time: new Date(bar.t).toLocaleDateString(), // Conversion de l'horodatage en date lisible
    open: bar.o,  // Prix d'ouverture
    high: bar.h,  // Prix le plus haut
    low: bar.l,   // Prix le plus bas
    close: bar.c, // Prix de clôture
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="close" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
