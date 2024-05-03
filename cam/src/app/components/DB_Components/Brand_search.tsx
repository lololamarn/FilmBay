import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

interface BrandDetailsProps {
    brandID: string;
    onClose: () => void;
}

interface Camera {
    Camera_ID: string;
    Camera_Name: string;
    Brand_ID: string;
}

interface Lens {
    Lens_ID: string;
    Lens_Name: string;
    Brand_ID: string;
}

interface Media {
    Media_ID: string;
    Keyword: string;
    Img_URL: string;
    Brand_ID: string;
}

const BrandDetailsComponent: React.FC<BrandDetailsProps> = ({ brandID, onClose }) => {
    const [brandName, setBrandName] = useState<string>(''); 
    const [cameras, setCameras] = useState<Camera[]>([]);
    const [lenses, setLenses] = useState<Lens[]>([]);
    const [media, setMedia] = useState<Media[]>([]);
    const [visibleCardIndex, setVisibleCardIndex] = useState<number>(0); 
    const [isVisible, setIsVisible] = useState<boolean>(true); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const brandResponse = await fetch(`http://localhost:8080/api/brands/byBrand/${brandID}`);
                if (brandResponse.ok) {
                    const brandData = await brandResponse.json();
                    setBrandName(brandData.Brand_Name);
                } else {
                    console.error('Error fetching brand name:', brandResponse.statusText);
                }

                const camerasResponse = await fetch(`http://localhost:8080/api/cameras/byBrand/${brandID}`);
                if (camerasResponse.ok) {
                    const camerasData = await camerasResponse.json();
                    setCameras(camerasData);
                } else {
                    console.error('Error fetching cameras:', camerasResponse.statusText);
                }

                const lensesResponse = await fetch(`http://localhost:8080/api/lenses/byBrand/${brandID}`);
                if (lensesResponse.ok) {
                    const lensesData = await lensesResponse.json();
                    setLenses(lensesData);
                } else {
                    console.error('Error fetching lenses:', lensesResponse.statusText);
                }

                const mediaResponse = await fetch(`http://localhost:8080/api/media/byBrand/${brandID}`);
                if (mediaResponse.ok) {
                    const mediaData = await mediaResponse.json();
                    setMedia(mediaData);
                } else {
                    console.error('Error fetching media:', mediaResponse.statusText);
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        };

        fetchData();
    }, [brandID]);

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleCardIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        onClose();
    };

    return (
        <div className={`text-black fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isVisible ? 'block' : 'hidden'}`}>
            <div className="max-w-lg w-full p-8 bg-gray-200 rounded-lg shadow-lg relative">
                <button onClick={handleClose} className="absolute top-2 right-2 text-3xl bg-red-900 text-white p-2 rounded-full">
                    <IoMdCloseCircleOutline className="h-8 text-white" />
                </button>
                <h1 className="text-xl font-bold text-center mb-4">{brandName}</h1> 

                {cameras.length > 0 && lenses.length > 0 && media.length > 0 && (
                    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="font-semibold">Cámara: {cameras[visibleCardIndex].Camera_Name}</h2>
                        
                        <h2 className="font-semibold">Lente: {lenses[visibleCardIndex].Lens_Name}</h2>
                        
                        <h2 className="font-semibold">Palabra Clave: {media[visibleCardIndex].Keyword}</h2>
                        <Image
                            src={media[visibleCardIndex].Img_URL}
                            alt="Media Image"
                            width={500} 
                            height="999" 
                            className="mt-2 max-w-full h-auto"
                        />
                        
                    </div>
                )}

            </div>
        </div>
    );
};

export default BrandDetailsComponent;
