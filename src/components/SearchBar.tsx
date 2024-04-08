import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query);
        setQuery('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 flex justify-center">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Enter city name"
                className="border border-gray-400 rounded-l px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white rounded-r px-4 py-2 ml-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
