import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PerformanceDetailsProps {
  assetId: string;
}

interface PerformanceData {
  date: string;
  value: number;
}

const PerformanceDetails: React.FC<PerformanceDetailsProps> = ({ assetId }) => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`/api/performances/${assetId}`)
      .then(response => {
        setPerformanceData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching performance data');
        setLoading(false);
      });
  }, [assetId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold">Performance Details</h2>
      {performanceData.map((data, index) => (
        <div key={index} className="p-2">
          <p>{data.date}: {data.value}</p>
        </div>
      ))}
    </div>
  );
};

export default PerformanceDetails;
