import React, { useState } from "react";

interface SearchBarProps {
    onSearch: (symbol: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [symbol, setSymbol] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSymbol(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(symbol.toUpperCase());
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 text-dark-purple">
            <input
                type="text"
                value={symbol}
                onChange={handleChange}
                placeholder="Enter company symbol"
                className="p-2 border rounded"
            />
            <button
                type="submit"
                className="ml-2 p-2 bg-blue-500 text-white rounded"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
