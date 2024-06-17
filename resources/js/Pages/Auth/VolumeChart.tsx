import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface BarData {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

interface VolumeChartProps {
  data: BarData[];
}

const VolumeChart: React.FC<VolumeChartProps> = ({ data }) => {
  const formattedData = data.map(bar => ({
    time: new Date(bar.t).toLocaleDateString(), // Conversion de l'horodatage en date lisible
    volume: bar.v,  // Volume des transactions
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="volume" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VolumeChart;
