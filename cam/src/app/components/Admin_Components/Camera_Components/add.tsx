import React, { useState, useEffect } from 'react';

interface AddCameraProps {
    handleAdd: () => void;
    onClose: () => void;
}

interface Brand {
    Brand_ID: string;
    Brand_Name: string;
}

const AddCamera: React.FC<AddCameraProps> = ({ handleAdd, onClose }) => {
    const [cameraData, setCameraData] = useState<any>({});
    const [brands, setBrands] = useState<Brand[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [formError, setFormError] = useState<string>('');

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/brands");
                if (response.ok) {
                    const data = await response.json();
                    setBrands(data);
                } else {
                    console.error('Error fetching brands:', response.statusText);
                }
            } catch (error) {
                console.error('Error de red al obtener marcas:', error);
            }
        };

        fetchBrands();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCameraData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!cameraData.Camera_Name || !selectedBrand || !cameraData.Mount || !cameraData.Detalles) {
            setFormError('Por favor completa todos los campos.');
            return false;
        }
        return true;
    };

    const addCamera = async () => {
        if (validateForm()) {
            try {
                const response = await fetch(`http://localhost:8080/api/add-camera`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ Camera_Name: cameraData.Camera_Name, Brand_ID: selectedBrand, Mount: cameraData.Mount, Detalles: cameraData.Detalles }),
                });

                if (response.ok) {
                    window.location.reload();
                    console.log('Cámara agregada exitosamente');
                    handleAdd();
                } else {
                    const data = await response.json();
                    console.error('Error al agregar cámara:', data.error || 'Error desconocido');
                }
            } catch (error) {
                console.error('Error de red al agregar cámara:', error);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="max-w-lg w-full p-8 bg-gray-200 rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-3xl bg-red-900 text-white p-2 rounded-full">
                    X
                </button>
                <form className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="cameraName" className="block text-sm font-medium text-black">Nombre de la cámara:</label>
                        <input
                            type="text"
                            id="cameraName"
                            name="Camera_Name"
                            value={cameraData.Camera_Name || ''}
                            onChange={handleInputChange}
                            className="mt-1 text-black border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4 text-black">
                        <label htmlFor="brand" className="block text-sm font-medium text-black">Marca:</label>
                        <select
                            id="brand"
                            name="Brand"
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="mt-1 text-black border border-gray-300 rounded-md px-3 py-2 w-full"
                        >
                            <option value="">Seleccionar marca</option>
                            {brands.map(brand => (
                                <option key={brand.Brand_ID} value={brand.Brand_ID} className='text-black'>
                                    {brand.Brand_Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mount" className="block text-sm font-medium text-black">Montura:</label>
                        <input
                            type="text"
                            id="mount"
                            name="Mount"
                            value={cameraData.Mount || ''}
                            onChange={handleInputChange}
                            className="mt-1 text-black border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="details" className="block text-sm font-medium text-black">Detalles:</label>
                        <textarea
                            id="details"
                            name="Detalles"
                            value={cameraData.Detalles || ''}
                            onChange={handleInputChange}
                            className="mt-1 text-black border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            if (window.confirm('¿Estás seguro de agregar esta cámara?')) {
                                addCamera();
                            }
                        }}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-auto block"
                    >
                        Agregar cámara
                    </button>
                    {formError && <div className="text-red-500 mt-2 text-xl">{formError}</div>}
                </form>
            </div>
        </div>
    );
};

export default AddCamera;
