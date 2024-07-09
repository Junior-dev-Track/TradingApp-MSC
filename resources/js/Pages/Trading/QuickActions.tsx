import React, { useState } from 'react';
import axios from 'axios';

interface QuickActionProps {
  assetId: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ assetId }) => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async () => {
    try {
      const response = await axios.post('/api/actions/buy', { assetId });
      setStatus('Buy successful');
    } catch (error) {
      setError('Failed to execute buy action');
    }
  };

  const handleSell = async () => {
    try {
      const response = await axios.post('/api/actions/sell', { assetId });
      setStatus('Sell successful');
    } catch (error) {
      setError('Failed to execute sell action');
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleBuy}>
        Buy
      </button>
      <button className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleSell}>
        Sell
      </button>
      <p>{status}</p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default QuickAction;
