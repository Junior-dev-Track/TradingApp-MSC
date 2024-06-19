import React, { useState } from 'react';

interface FavoriteFormProps {
  onAddFavorite: (symbol: string) => void;
}

const FavoriteForm: React.FC<FavoriteFormProps> = ({ onAddFavorite }) => {
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (symbol) {
      onAddFavorite(symbol);
      setSymbol('');
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
      <button type="submit" className="bg-blue-500 p-2 rounded">
        Add to Favorites
      </button>
    </form>
  );
};

export default FavoriteForm;
