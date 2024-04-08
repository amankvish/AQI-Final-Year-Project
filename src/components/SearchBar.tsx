// SearchBar.tsx

import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce'; // Import debounce function from lodash

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Debounce the input change handler
    const handleChange = debounce((value: string) => {
        setQuery(value);
        fetchSuggestions(value); // Fetch suggestions based on input value
    }, 300);

    // Fetch suggestions from the geocoding API based on input value
    const fetchSuggestions = async (value: string) => {
        // Call your geocoding API to fetch suggestions based on the input value
        // Update the suggestions state with the fetched suggestions
        // Example:
        // const suggestions = await fetchSuggestionsFromAPI(value);
        // setSuggestions(suggestions);
    };

    // Handle search when user selects a suggestion
    const handleSuggestionSelect = (selectedSuggestion: string) => {
        setQuery(selectedSuggestion); // Populate the search bar with the selected suggestion
        onSearch(selectedSuggestion); // Trigger the search with the selected suggestion
        setSuggestions([]); // Clear suggestions after selection
    };

    // Handle form submission (optional)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 flex justify-center">
            <input
                type="text"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Enter city name"
                className="border border-gray-400 rounded-l px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white rounded-r px-4 py-2 ml-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out">
                Search
            </button>
            {/* Display suggestions in a dropdown */}
            {suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-48 overflow-y-auto shadow-md">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSuggestionSelect(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default SearchBar;
