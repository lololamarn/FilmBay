import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (data: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/search-media?keyword=${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                onSearch(data);
            } else {
                throw new Error('Error en la búsqueda de media');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center">
            <i className="px-3 fas fa-search ml-1"></i>
            <input
                type="text"
                placeholder="Buscar..."
                className="ml-3 focus:outline-none w-full filter grayscale bg-black"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch} className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Buscar
            </button>
        </div>
    );
};

export default SearchBar;
