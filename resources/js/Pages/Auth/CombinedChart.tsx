import React from 'react';
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
