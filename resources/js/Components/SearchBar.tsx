import React, { useState, useEffect } from "react";
interface SearchBarProps {
    placeholder?: string;
    onSearch: (searchTerm: string) => void;
}

// Mock function to simulate fetching symbols based on input
// Replace this with your actual API call
const fetchSymbolSuggestions = async (input: string) => {
    const symbols = [
        "AAPL",
        "MSFT",
        "AMZN",
        "GOOGL",
        "GOOG",
        "TSLA",
        "BRK.B",
        "NVDA",
        "JPM",
        "JNJ",+
        "V",
        "UNH",
        "HD",
        "PG",
        "MA",
        "DIS",
        "PYPL",
        "BAC",
        "ADBE",
    ]; // Example symbols
    return symbols.filter((symbol) => symbol.toString().includes(input.toUpperCase()));
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [symbol, setSymbol] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (symbol.length > 0) {
            const loadSuggestions = async () => {
                const fetchedSuggestions = await fetchSymbolSuggestions(symbol);
                setSuggestions(fetchedSuggestions.map((suggestion) => suggestion.toString()));
            };
            loadSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [symbol]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSymbol(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(symbol.toUpperCase());
        setSuggestions([]);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSymbol(suggestion);
        setSuggestions([]);
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
                className="ml-2 p-2 bg-darker-blue text-white rounded"
            >
                Search
            </button>
            <ul>
                {suggestions.map((suggestion) => (
                    <li
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                    >
                        {suggestion}
                    </li>
                ))}
            </ul>
        </form>
    );
};

export default SearchBar;
