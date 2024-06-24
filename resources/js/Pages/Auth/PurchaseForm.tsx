import React, { useState } from 'react';

interface PurchaseFormProps {
  onAddPurchase: (symbol: string, price: number) => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ onAddPurchase }) => {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState<number | ''>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (symbol && price) {
      onAddPurchase(symbol, Number(price));
      setSymbol('');
      setPrice('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 text-white rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium">Stock Symbol</label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="mt-1 p-2 w-full bg-gray-700 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Purchase Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-1 p-2 w-full bg-gray-700 rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 p-2 rounded">
        Add to Assets
      </button>
    </form>
  );
};

export default PurchaseForm;
