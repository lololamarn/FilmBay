"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MdCameraRoll } from 'react-icons/md';
import { GiClick } from "react-icons/gi";

interface Brand {
    Image: string;
    Brand: string;
}

const BrandReco: React.FC = () => {
    const [message, setMessage] = useState("Loading");
    const [brands, setBrands] = useState<Brand[]>([]);
    const [randomBrand, setRandomBrand] = useState<Brand | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/brands")
            .then(response => response.json())
            .then((data: Brand[]) => {
                console.log(data);
                setBrands(data);
                setMessage("");
                const randomIndex = Math.floor(Math.random() * data.length);
                setRandomBrand(data[randomIndex]);
            })
            .catch(error => {
                console.error('Error fetching brands:', error);
                setMessage("Error fetching brands");
            });
    }, []);

    return (
        <main>

            {randomBrand && (

                <div className="max-w-sm flex flex-col font-serif font-family:Times">
                    <p className="text-3xl md:text-4xl font-semibold uppercase text-black mb-2">Tus marcas favoritas en</p>
                    <div className="flex items-left">
                        <MdCameraRoll className="text-yellow-500 text-3xl" />
                        <span className="text-black text-1xl mb-4 mt-1">FilmBay</span>
                    </div>
                    <h1 className="mt-1 mb-3 font-semibold text-center text-white-400 bg-black">Marca Recomendada</h1>
                    <button className="relative transform scale-100 hover:scale-110 transition duration-300">
                        <Image
                            src={randomBrand.Image}
                            alt={randomBrand.Brand}
                            width={400}
                            height={400}
                        />
                        <GiClick className=" text-5xl absolute top-1/8 -right-2 transform -translate-y-1/2 text-white" />
                    </button>

                </div>
            )}
        </main>
    );
};

export default BrandReco;
