'use client'

import React, { useState } from 'react';
import SidebarLayout from '../Side_Bar/side_BarMenu';
import SearchBar from './search_Bar';
import DeleteComponent from './delete';
import EditComponent from './edit';
import Image from 'next/image';

import AddBrand from './add'; 

interface AdminPageProps { }

const AdminPage: React.FC<AdminPageProps> = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAddBrand, setShowAddBrand] = useState(false);

  const handleSearch = (data: any) => {
    setSearchResults(data);
    setSelectedIndex(null);
    setStartIndex(0);
  };

  const handleSelectResult = (index: number) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 3, searchResults.length - 3));
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  const handleEdit = () => {
    console.log('Editar resultado');
  };

  const handleDeleteBrand = async (Brand_ID: string | undefined) => {
    if (Brand_ID) {
      const response = await fetch(`http://localhost:8080/api/delete-brand/${Brand_ID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Marca eliminada exitosamente');
        window.location.reload();
      } else {
        console.error('Error al eliminar marca: Error interno del servidor');
      }

    } else {
      console.error('ID de marca no válido');
    }
  };

  return (
    <div className="bg-gray-900 lg:flex font-serif">
      
      {showAddBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <AddBrand handleAdd={() => setShowAddBrand(false)} onClose={() => setShowAddBrand(false)} /> 
          </div>
        </div>
      )}

      <nav className="bg-white border-b border-yellow-400">
        <SidebarLayout />
      </nav>

      <div className="lg:w-full lg:ml-64 px-6 py-8">
        <div className="">

          <button
            className="lg:w-full bg-yellow-500  hover:bg-yellow-700 p-2 rounded-full mb-6 text-white font-bold py-2 px-4 "
            onClick={() => setShowAddBrand(true)} 
          >
            Agregar Marca
          </button>

        </div>
        <div className="bg-black rounded-full border-none p-3 mb-4 shadow-md">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="lg:flex gap-4 items-stretch">
          <div className="bg-gray-500 md:p-2 p-6 rounded-lg border border-yellow-400 ">
            <h1 className='text-xl text-center mt-2 mr-2 ml-2'>Información de la marca Seleccionada</h1>
            {selectedIndex !== null && (
              <div className="flex justify-center items-center space-x-5 h-full">
                <div className='m-4'>
                  <div className="bg-gray-800 p-2 rounded mb-2">
                    <div className="col-span-2 bg-black">
                      <div className="bg-gray-800 p-2 rounded"> 
                        <Image width='200' height='200' src={searchResults[selectedIndex]?.Image} alt={searchResults[selectedIndex]?.Brand_Name} className="max-w-xs h-auto mx-auto" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="bg-gray-800 p-2 rounded">
                        <p className="text-sm font-semibold text-white">ID MARCA: {searchResults[selectedIndex]?.Brand_ID}</p>
                      </div>
                    </div>
                    <div>
                      <div className="bg-gray-800 p-2 rounded"> 
                        <p className="text-sm font-semibold text-white">MARCA: {searchResults[selectedIndex]?.Brand_Name}</p>
                      </div>
                    </div>

                  </div>
                  <div className="mt-4 flex justify-center space-x-4">
                    <EditComponent
                      handleEdit={handleEdit}
                      Brand_ID={searchResults[selectedIndex]?.Brand_ID}
                    />
                    <DeleteComponent
                      handleDelete={() => { }}
                      Brand_ID={searchResults[selectedIndex]?.Brand_ID}
                      handleDeleteCamera={handleDeleteBrand}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>


          <div className="bg-black rounded-lg p-4 shadow-md my-4 lg:w-[65%]">
            <h2 className="text-lg font-bold text-gray-600 mb-4">Resultados de búsqueda</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.slice(startIndex, startIndex + 3).map((result, index) => (
                <div key={index} className={`bg-gray-200 p-4 rounded-md cursor-pointer ${selectedIndex === startIndex + index ? 'bg-blue-200' : ''}`} onClick={() => handleSelectResult(startIndex + index)}>
                  <div className="mb-4">
                    <p className='text-black font-semibold'>Nombre de la marca:</p>
                    <p className='text-black'>{result.Brand_Name}</p>
                  </div>
                  <div className="mb-4">
                    <p className='text-black font-semibold'>ID marca:</p>
                    <p className='text-black'>{result.Brand_ID}</p>
                  </div>
                  <div className="mb-4">
                    <Image width='100' height='100' src={result.Image} alt={result.Brand_Name} className="max-w-xs h-auto mx-auto" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handlePrev}
                disabled={startIndex === 0}
              >
                Anterior
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleNext}
                disabled={startIndex + 3 >= searchResults.length}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
