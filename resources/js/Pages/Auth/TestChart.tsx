import React from 'react';
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const testData = [
  { time: '2021-01-01', open: 100, high: 150, low: 90, close: 120, volume: 3000 },
  { time: '2021-01-02', open: 120, high: 160, low: 110, close: 130, volume: 2500 },
  { time: '2021-01-03', open: 130, high: 170, low: 120, close: 140, volume: 2000 },
];

const TestChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={testData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="volume" fill="#82ca9d" />
        <Line yAxisId="right" type="monotone" dataKey="close" stroke="#8884d8" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default TestChart;
