import React, { useState, useEffect } from 'react';

interface EditComponentProps {
    handleEdit: () => void;
    Media_ID: string | undefined;
}

interface Brand {
    Brand_ID: string;
    Brand_Name: string;
}

interface Camera {
    Camera_ID: string;
    Camera_Name: string;
}

interface Lens {
    Lens_ID: string;
    Lens_Name: string;
}

const EditComponent: React.FC<EditComponentProps> = ({ handleEdit, Media_ID }) => {
    const [mediaData, setMediaData] = useState<any>({});
    const [showEditForm, setShowEditForm] = useState(false);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [cameras, setCameras] = useState<Camera[]>([]);
    const [lenses, setLenses] = useState<Lens[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [selectedCamera, setSelectedCamera] = useState<string>('');
    const [selectedLens, setSelectedLens] = useState<string>('');
    const [formError, setFormError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            if (Media_ID) {
                try {
                    const response = await fetch(`http://localhost:8080/api/get-media/${Media_ID}`);
                    if (response.ok) {
                        const data = await response.json();
                        setMediaData(data);
                        setShowEditForm(false);
                    } else {
                        const errorData = await response.json();
                        console.error('Error fetching media data:', errorData.error || 'Unknown error');
                    }
                } catch (error) {
                    console.error('Network error fetching media data:', error);
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
                console.error('Network error fetching brands:', error);
            }
        };

        const fetchCameras = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/cameras");
                if (response.ok) {
                    const data = await response.json();
                    setCameras(data);
                } else {
                    console.error('Error fetching cameras:', response.statusText);
                }
            } catch (error) {
                console.error('Network error fetching cameras:', error);
            }
        };

        const fetchLenses = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/lenses");
                if (response.ok) {
                    const data = await response.json();
                    setLenses(data);
                } else {
                    console.error('Error fetching lenses:', response.statusText);
                }
            } catch (error) {
                console.error('Network error fetching lenses:', error);
            }
        };

        fetchData();
        fetchBrands();
        fetchCameras();
        fetchLenses();
    }, [Media_ID]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMediaData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!mediaData.Keyword || !selectedBrand || !selectedCamera || !selectedLens || !mediaData.Img_URL) {
            setFormError('Por favor completa todos los campos.');
            return false;
        }
        return true;
    };

    const editMedia = async () => {
        if (Media_ID) {
            if (validateForm()) {
                try {
                    const response = await fetch(`http://localhost:8080/api/edit-media/${Media_ID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            Keyword: mediaData.Keyword,
                            Brand_ID: selectedBrand,
                            Camera_ID: selectedCamera,
                            Lens_ID: selectedLens,
                            Img_URL: mediaData.Img_URL,
                        }),
                    });

                    if (response.ok) {
                        window.location.reload();
                        console.log('Media edited successfully');
                        handleEdit();
                    } else {
                        const data = await response.json();
                        console.error('Error editing media:', data.error || 'Unknown error');
                    }
                } catch (error) {
                    console.error('Network error editing media:', error);
                }
            }
        } else {
            console.error('ID de media no válido');
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
                        <label htmlFor="keyword" className="block text-sm font-medium text-black">Palabra Clave:</label>
                        <input
                            type="text"
                            id="keyword"
                            name="Keyword"
                            value={mediaData.Keyword || ''}
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
                    <div className="mb-4 text-black">
                        <label htmlFor="camera" className="block text-sm font-medium text-black">Cámara:</label>
                        <select
                            id="camera"
                            name="Camera_ID"
                            value={selectedCamera}
                            onChange={(e) => setSelectedCamera(e.target.value)}
                            className="mt-1 text-black border border-gray-300 rounded-md px-3 py-2 w-full"
                        >
                            <option value="">Seleccionar cámara</option>
                            {cameras.map(camera => (
                                <option key={camera.Camera_ID} value={camera.Camera_ID} className='text-black'>
                                    {camera.Camera_Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4 text-black">
                        <label htmlFor="lens" className="block text-sm font-medium text-black">Lente:</label>
                        <select
                            id="lens"
                            name="Lens_ID"
                            value={selectedLens}
                            onChange={(e) => setSelectedLens(e.target.value)}
                            className="mt-1 text-black border border-gray-300 rounded-md px-3 py-2 w-full"
                        >
                            <option value="">Seleccionar lente</option>
                            {lenses.map(lens => (
                                <option key={lens.Lens_ID} value={lens.Lens_ID} className='text-black'>
                                    {lens.Lens_Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="imgUrl" className="block text-sm font-medium text-black">URL de la imagen:</label>
                        <input
                            type="text"
                            id="imgUrl"
                            name="Img_URL"
                            value={mediaData.Img_URL || ''}
                            onChange={handleInputChange}
                            className="mt-1 text-black border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            if (window.confirm('¿Estás seguro de guardar los cambios?')) {
                                editMedia();
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
