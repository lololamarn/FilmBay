'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BrandDetailsComponent from './Brand_search';

interface Brand {
  Image: string;
  Brand_Name: string;
  Brand_ID: string;
}

const BrandMenu: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [brandID, setBrandID] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    fetch("http://localhost:8080/api/brands")
      .then(response => response.json())
      .then((data: Brand[]) => {
        setBrands(data);
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
      });
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBrandID('');
  };

  const handleBrandClick = (Brand_ID: string) => {
    setIsModalOpen(true);
    setBrandID(Brand_ID);
  };

  return (
    <main>
      <div className="mt-10">
        <ul className="-m-3.5 flex">
          {brands.map((brand, index) => (
            <div key={index} onClick={() => handleBrandClick(brand.Brand_ID)} className={`m-3.5 h-52 w-40 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center hover:bg-gray-800 hover:shadow-2xl transform ${selectedBrand === brand.Brand_ID ? 'scale-110' : 'scale-100'} transition duration-300`}>
              <Image
                src={brand.Image}
                alt={brand.Brand_Name}
                className="max-h-20"
                width={100}
                height={100}
              />
            </div>
          ))}
        </ul>
      </div>
      {isModalOpen && ( 
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="max-w-lg w-full p-8 bg-gray-200 rounded-lg shadow-lg relative">
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-3xl bg-red-900 text-white p-2 rounded-full">
              &times;
            </button>
            
            <BrandDetailsComponent brandID={brandID} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </main>
  );
};

export default BrandMenu;
