'use client'
import React, { useState } from 'react';
import { IoSearchCircleOutline } from 'react-icons/io5';

interface SearchResult {
    id: number;
    name: string;
}

const SearchComponent: React.FC = () => {
    const [searchType, setSearchType] = useState('search-camera');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = async () => {
        try {
            let endpoint = '';
            let errorMessage = '';

            if (searchType === 'search-lens') {
                endpoint = 'search-lens';
                errorMessage = 'Error en la búsqueda de lentes';
            } else if (searchType === 'searchBrand-byname') {
                endpoint = 'searchBrand-byname';
                errorMessage = 'Error en la búsqueda de marcas';
            } else {
                endpoint = 'search-camera';
                errorMessage = 'Error en la búsqueda de cámaras';
            }

            const response = await fetch(`http://localhost:8080/api/${endpoint}?searchTerm=${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const mappedData = data.map((item: any) => ({
                    id: item.Camera_ID || item.Lens_ID || item.Brand_ID,
                    name: item.Camera_Name || item.Lens_Name || item.Brand_Name,
                }));
                setSearchResults(mappedData.slice(0, 5));
                setShowResults(true);
            } else {
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleHideResults = () => {
        setShowResults(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="relative">
            <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-300 rounded-md hidden lg:flex items-center text-black">
                <select
                    className="bg-transparent uppercase font-bold text-sm p-4 mr-4 text-black"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value="search-lens">search-lens</option>
                    <option value="search-camera">search-camera</option>
                    <option value="searchBrand-byname">searchBrand-byname</option>
                </select>

                <input
                    className="border-xl border-black bg-transparent font-semibold text-xl pl-4"
                    type="text"
                    placeholder="Estoy buscando..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress}
                />

                <IoSearchCircleOutline
                    className="px-25 ml-20 text-black text-5xl cursor-pointer"
                    onClick={handleSearch}
                />
            </div>

            {showResults && (
                <div className="absolute w-full bg-gray-400 rounded-md shadow-xl max-h-50 overflow-x-auto z-15">
                    {searchResults.map((result, index) => (
                        <div key={index} className="p-1 border-b border-gray-200">
                            <h3 className="text-sm font-semibold text-white">{result.name}</h3>
                        </div>
                    ))}
                    <button className="absolute top-0 right-0 mr-2 mt-2 p-1 bg-gray-500 text-white text-xs" onClick={handleHideResults}>Hide</button>
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
