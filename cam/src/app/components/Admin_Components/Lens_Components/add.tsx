import React, { useState, useEffect } from 'react';

interface AddLensProps {
    handleAdd: () => void;
    onClose: () => void;
}

interface Brand {
    Brand_ID: string;
    Brand_Name: string;
}

const AddLens: React.FC<AddLensProps> = ({ handleAdd, onClose }) => {
    const [lensData, setLensData] = useState<any>({});
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
        setLensData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!lensData.Lens_Name || !selectedBrand || !lensData.Mount || !lensData.Focal_length || !lensData.Detalles) {
            setFormError('Por favor completa todos los campos.');
            return false;
        }
        return true;
    };

    const addLens = async () => {
        if (validateForm()) {
            try {
                const response = await fetch(`http://localhost:8080/api/add-lens`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Lens_Name: lensData.Lens_Name,
                        Brand_ID: selectedBrand,
                        Mount: lensData.Mount,
                        Focal_length: lensData.Focal_length,
                        Detalles: lensData.Detalles
                    }),
                });

                if (response.ok) {
                    window.location.reload();
                    console.log('Lente agregada exitosamente');
                    handleAdd();
                } else {
                    const data = await response.json();
                    console.error('Error al agregar lente:', data.error || 'Error desconocido');
                }
            } catch (error) {
                console.error('Error de red al agregar lente:', error);
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
                        <label htmlFor="lensName" className="block text-sm font-medium text-black">Nombre de la lente:</label>
                        <input
                            type="text"
                            id="lensName"
                            name="Lens_Name"
                            value={lensData.Lens_Name || ''}
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
                        <label htmlFor="mountType" className="block text-sm font-medium text-black">Montura:</label>
                        <input
                            type="text"
                            id="mountType"
                            name="Mount"
                            value={lensData.Mount || ''}
                            onChange={handleInputChange}
                            className="mt-1 text-black border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="focalLength" className="block text-sm font-medium text-black">Longitud focal:</label>
                        <input
                            type="text"
                            id="focalLength"
                            name="Focal_length"
                            value={lensData.Focal_length || ''}
                            onChange={handleInputChange}
                            className="mt-1 text-black border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="details" className="block text-sm font-medium text-black">Detalles:</label>
                        <textarea
                            id="details"
                            name="Detalles"
                            value={lensData.Detalles || ''}
                            onChange={handleInputChange}
                            className="mt-1 text-black border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            if (window.confirm('¿Estás seguro de agregar esta lente?')) {
                                addLens();
                            }
                        }}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-auto block"
                    >
                        Agregar lente
                    </button>
                    {formError && <div className="text-red-500 mt-2 text-xl">{formError}</div>}
                </form>
            </div>
        </div>
    );
};

export default AddLens;
