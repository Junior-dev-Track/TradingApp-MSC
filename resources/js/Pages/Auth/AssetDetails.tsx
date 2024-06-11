import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AssetDetailsProps {
  assetId: string;
}

const AssetDetails: React.FC<AssetDetailsProps> = ({ assetId }) => {
  const [asset, setAsset] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/assets/${assetId}`)
      .then(response => {
        setAsset(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching asset details');
        setLoading(false);
      });
  }, [assetId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold">{asset?.name}</h1>
      <p className="text-gray-600">{asset?.description}</p>
      {/* Autres détails */}
    </div>
  );
};

export default AssetDetails;
