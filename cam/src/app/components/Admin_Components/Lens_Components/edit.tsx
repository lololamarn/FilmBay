import React, { useState, useEffect } from 'react';

interface EditComponentProps {
    handleEdit: () => void;
    Lens_ID: string | undefined;
}

interface Brand {
    Brand_ID: string;
    Brand_Name: string;
}

const EditComponent: React.FC<EditComponentProps> = ({ handleEdit, Lens_ID }) => {
    const [lensData, setLensData] = useState<any>({});
    const [showEditForm, setShowEditForm] = useState(false);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [formError, setFormError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            if (Lens_ID) {
                try {
                    const response = await fetch(`http://localhost:8080/api/get-lens/${Lens_ID}`);
                    if (response.ok) {
                        const data = await response.json();
                        setLensData(data);
                        setShowEditForm(false);
                    } else {
                        const errorData = await response.json();
                        console.error('Error al obtener datos de la lente:', errorData.error || 'Error desconocido');
                    }
                } catch (error) {
                    console.error('Error de red al obtener datos de la lente:', error);
                }
            }
        };

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

        fetchData();
        fetchBrands();
    }, [Lens_ID]);

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

    const editLens = async () => {
        if (Lens_ID) {
            if (validateForm()) {
                try {
                    const response = await fetch(`http://localhost:8080/api/edit-lens/${Lens_ID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ Lens_Name: lensData.Lens_Name, Brand_ID: selectedBrand, Mount: lensData.Mount, Focal_length: lensData.Focal_length, Detalles: lensData.Detalles }),
                    });

                    if (response.ok) {
                        window.location.reload();
                        console.log('Lente editada exitosamente');
                        handleEdit();
                    } else {
                        const data = await response.json();
                        console.error('Error al editar lente:', data.error || 'Error desconocido');
                    }
                } catch (error) {
                    console.error('Error de red al editar lente:', error);
                }
            }
        } else {
            console.error('ID de lente no válido');
        }
    };

    return (
        <div>
            <button
                onClick={() => setShowEditForm(true)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded float-left mb-10"
            >
                Editar
            </button>

            {showEditForm && (
                <form className="mt-4">
                    <div className="mb-4">
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
                            name="Brand_ID"
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
                            if (window.confirm('¿Estás seguro de guardar los cambios?')) {
                                editLens();
                            }
                        }}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-auto block"
                    >
                        Guardar cambios
                    </button>

                    {formError && <div className="text-red-500 mt-2 text-xl">{formError}</div>}
                </form>
            )}
        </div>
    );
};

export default EditComponent;
