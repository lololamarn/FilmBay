import React, { useState, useEffect } from 'react';

interface EditComponentProps {
    handleEdit: () => void;
    Camera_ID: string | undefined;
}

interface Brand {
    Brand_ID: string;
    Brand_Name: string;
}

const EditComponent: React.FC<EditComponentProps> = ({ handleEdit, Camera_ID }) => {
    const [cameraData, setCameraData] = useState<any>({});
    const [showEditForm, setShowEditForm] = useState(false);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [formError, setFormError] = useState<string>(''); 

    useEffect(() => {
        const fetchData = async () => {
            if (Camera_ID) {
                try {
                    const response = await fetch(`http://localhost:8080/api/get-camera/${Camera_ID}`);
                    if (response.ok) {
                        const data = await response.json();
                        setCameraData(data);
                        setShowEditForm(false);
                    } else {
                        const errorData = await response.json();
                        console.error('Error al obtener datos de la cámara:', errorData.error || 'Error desconocido');
                    }
                } catch (error) {
                    console.error('Error de red al obtener datos de la cámara:', error);
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
    }, [Camera_ID]);

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

    const editCamera = async () => {
        if (Camera_ID) {
            if (validateForm()) {
                try {
                    const response = await fetch(`http://localhost:8080/api/edit-camera/${Camera_ID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ...cameraData, Brand: selectedBrand }),
                    });

                    if (response.ok) {
                        window.location.reload();
                        console.log('Cámara editada exitosamente');
                        handleEdit();
                    } else {
                        const data = await response.json();
                        console.error('Error al editar cámara:', data.error || 'Error desconocido');
                    }
                } catch (error) {
                    console.error('Error de red al editar cámara:', error);
                }
            }
        } else {
            console.error('ID de cámara no válido');
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
                            if (window.confirm('¿Estás seguro de guardar los cambios?')) {
                                editCamera();
                                
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
