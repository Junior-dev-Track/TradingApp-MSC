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
        <form onSubmit={handleSubmit} className="flex items-center mb-4 text-dark-purple w-full">
   <div className="relative mb-4 text-dark-purple">
    <div className="flex items-center gap-1">  {/* Ajout de gap-2 pour un espace entre les éléments */}
        <input
            type="text"
            value={symbol}
            onChange={handleChange}
            placeholder="Enter company symbol"
            className="flex-1 p-2 border rounded-l-lg"  /* Ajout de rounded-l-lg pour arrondir le coin gauche */
        />
        <button type="submit" className="p-2 bg-darker-blue text-white rounded-r-lg">
            Search
        </button>
    </div>
    {suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded mt-1 w-full z-20">
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
</div>



    </form>

    );
};

export default SearchBar;
