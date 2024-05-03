'use client'

import React, { useState } from 'react';
import SidebarLayout from '../Side_Bar/side_BarMenu';
import SearchBar from './search_Bar';
import DeleteComponent from './delete';
import EditComponent from './edit';
import AddCamera from './add'; 

interface AdminPageProps { }

const AdminPage: React.FC<AdminPageProps> = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAddCamera, setShowAddCamera] = useState(false);

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

  const handleDeleteCamera = async (Camera_ID: string | undefined) => {
    if (Camera_ID) {
      try {
        const response = await fetch(`http://localhost:8080/api/delete-camera/${Camera_ID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log('Cámara eliminada exitosamente');
          window.location.reload();
        } else {
          const data = await response.json();
          console.error('Error al eliminar cámara:', data.error || 'Error desconocido');
        }
      } catch (error) {
        console.error('Error de red al eliminar cámara:', error);
      }
    } else {
      console.error('ID de cámara no válido');
    }
  };

  return (
    <div className="bg-gray-900 lg:flex font-serif">

      
      {showAddCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <AddCamera handleAdd={() => setShowAddCamera(false)} onClose={() => setShowAddCamera(false)} />
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
            onClick={() => setShowAddCamera(true)} 
          >
            Agregar cámara
          </button>

        </div>
        <div className="bg-black rounded-full border-none p-3 mb-4 shadow-md">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="lg:flex gap-4 items-stretch">

          <div className="bg-gray-500 md:p-2 p-6 rounded-lg border border-yellow-400 ">

            <h1 className='text-xl text-center mt-2 mr-2 ml-2'>Información de la cámara Seleccionada</h1>
            {selectedIndex !== null && (
              <div className="flex justify-center items-center space-x-5 h-full">


                <div className="m-4">
                  <div className="bg-gray-800 p-2 rounded mb-2">
                    <p className="text-2xl font-semibold text-center text-white mb-2">{searchResults[selectedIndex].Camera_Name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="bg-gray-800 p-2 rounded">
                        <p className="text-sm font-semibold text-white">ID MARCA: {searchResults[selectedIndex].Brand}</p>

                      </div>

                    </div>
                    <div>
                      <div className="bg-gray-800 p-2 rounded"> {/* Caja para Montura */}
                        <p className="text-sm font-semibold text-gray-100">Montura: {searchResults[selectedIndex].Mount}</p>

                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="bg-gray-800 p-2 rounded"> {/* Caja para Detalles */}
                        <p className="text-lg font-semibold text-gray-100 text-center mb-2">Detalles:</p>
                        <p className="text-sm text-white mb-2">{searchResults[selectedIndex].Detalles}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center ">
                    <EditComponent
                      handleEdit={handleEdit}
                      Camera_ID={searchResults[selectedIndex]?.Camera_ID}
                    />
                    
                  </div>
                  <div className="mt-2 flex justify-center">
                  <DeleteComponent
                      handleDelete={() => { }}
                      Camera_ID={searchResults[selectedIndex]?.Camera_ID}
                      handleDeleteCamera={handleDeleteCamera}
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
                    <p className='text-black font-semibold'>Nombre de la cámara:</p>
                    <p className='text-black'>{result.Camera_Name}</p>
                  </div>
                  <div className="mb-4">
                    <p className='text-black font-semibold'>ID camara:</p>
                    <p className='text-black'>{result.Camera_ID}</p>
                  </div>
                  <div className="mb-4">
                    <p className='text-black font-semibold'>ID Marca:</p>
                    <p className='text-black'>{result.Brand}</p>
                  </div>
                  <div className="mb-4">
                    <p className='text-black font-semibold'>Montura:</p>
                    <p className='text-black'>{result.Mount}</p>
                  </div>
                  <div className="mb-4">
                    <p className='text-black font-semibold'>Detalles:</p>
                    <p className='text-black'>{result.Detalles}</p>
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
