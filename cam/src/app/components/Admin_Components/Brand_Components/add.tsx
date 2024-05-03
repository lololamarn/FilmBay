import React, { useState } from 'react';

interface AddBrandProps {
    handleAdd: () => void;
    onClose: () => void; 
}

const AddBrand: React.FC<AddBrandProps> = ({ handleAdd, onClose }) => {
    const [brandData, setBrandData] = useState<any>({});
    const [formError, setFormError] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBrandData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!brandData.Brand_Name || !brandData.Image) {
            setFormError('Por favor completa todos los campos.');
            return false;
        }
        return true;
    };

    const addBrand = async () => {
        if (validateForm()) {
            try {
                const response = await fetch(`http://localhost:8080/api/add-brand`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ Brand_Name: brandData.Brand_Name, Image: brandData.Image }),
                });

                if (response.ok) {
                    window.location.reload();
                    console.log('Marca agregada exitosamente');
                    handleAdd(); 
                } else {
                    const data = await response.json();
                    console.error('Error al agregar marca:', data.error || 'Error desconocido');
                }
            } catch (error) {
                console.error('Error de red al agregar marca:', error);
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
                        <label htmlFor="brandName" className="block text-sm font-medium text-black">Nombre de la marca:</label>
                        <input
                            type="text"
                            id="brandName"
                            name="Brand_Name"
                            value={brandData.Brand_Name || ''}
                            onChange={handleInputChange}
                            className="mt-1 text-black border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-black">Imagen:</label>
                        <input
                            type="text"
                            id="image"
                            name="Image"
                            value={brandData.Image || ''}
                            onChange={handleInputChange}
                            className="mt-1 text-black border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            if (window.confirm('¿Estás seguro de agregar esta marca?')) {
                                addBrand();
                            }
                        }}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-auto block"
                    >
                        Agregar marca
                    </button>
                    {formError && <div className="text-red-500 mt-2 text-xl">{formError}</div>}
                </form>
            </div>
        </div>
    );
};

export default AddBrand;
