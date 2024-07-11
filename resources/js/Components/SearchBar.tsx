import React, { useState, useEffect } from "react";

interface SearchBarProps {
    onSearch: (symbol: string) => void; // Function to execute the search
    allSymbols: string[]; // All possible symbols passed as props
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, allSymbols }) => {
    const [symbol, setSymbol] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (symbol && suggestions.length === 0) {
            const filteredSuggestions = allSymbols.filter((sym) =>
                sym.toLowerCase().startsWith(symbol.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else if (!symbol) {
            setSuggestions([]);
        }
    }, [symbol, allSymbols]);  // Assurez-vous que les dépendances sont correctes


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSymbol(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(symbol.toUpperCase());
        setSymbol(""); // Reset the search bar
        setSuggestions([]); // Clear the suggestions
    };
    const handleSuggestionClick = (suggestion: string) => {
        onSearch(suggestion.toUpperCase());  // Lancer la recherche avec la suggestion
        setSymbol('');  // Réinitialiser le symbole dans la barre de saisie
        setSuggestions([]);  // Effacer les suggestions
    };




    return (
        <form onSubmit={handleSubmit} className="flex items-center mb-4 text-dark-purple w-full">
        <div className="relative mb-4 text-dark-purple">
            <div className="flex items-center gap-1">
                <input
                    type="text"
                    value={symbol}
                    onChange={handleChange}
                    placeholder="Enter company symbol"
                    className="flex-1 p-2 border rounded-l-lg"
                />
                <button type="submit" className="p-2 bg-darker-blue text-white rounded-r-lg">
                    Search
                </button>
            </div>
            {suggestions.length > 0 && (
               <ul className="absolute bg-white border rounded mt-1 z-20 w-full sm:w-3/4 md:w-1/2 lg:w-2/3 xl:w-1/2 max-h-60 overflow-y-auto">
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
