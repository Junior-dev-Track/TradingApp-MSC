import React, { useState, useEffect } from "react";

interface SearchBarProps {
    onSearch: (symbol: string) => void;
    allSymbols: string[]; // Ajoutez cette prop pour recevoir tous les symboles possibles
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, allSymbols }) => {
    const [symbol, setSymbol] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (symbol) {
            const filteredSuggestions = allSymbols.filter((sym) =>
                sym.toLowerCase().startsWith(symbol.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [symbol, allSymbols]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSymbol(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(symbol.toUpperCase());
        setSymbol(""); // Réinitialiser la barre de recherche
        setSuggestions([]); // Effacer les suggestions
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
            {suggestions.length > 0 && (
                /* Ajoutez cette condition pour afficher les suggestions uniquement si elles existent */
                <ul className="absolute bg-white border rounded mt-1">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default SearchBar;
