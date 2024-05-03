import React, { useState, useEffect } from 'react';

interface EditComponentProps {
    handleEdit: () => void;
    Brand_ID: string | undefined;
}

interface Brand {
    Brand_ID: string;
    Brand: string;
}

const EditComponent: React.FC<EditComponentProps> = ({ handleEdit, Brand_ID }) => {
    const [brandData, setBrandData] = useState<any>({});
    const [showEditForm, setShowEditForm] = useState(false);
    const [brands, setBrands] = useState<Brand[]>([]);
   
    const [formError, setFormError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            if (Brand_ID) {
                try {
                    const response = await fetch(`http://localhost:8080/api/get-brand-by-id/${Brand_ID}`);
                    if (response.ok) {
                        const data = await response.json();
                        setBrandData(data);
                        setShowEditForm(false);
                    } else {
                        const errorData = await response.json();
                        console.error('Error fetching brand data:', errorData.error || 'Unknown error');
                    }
                } catch (error) {
                    console.error('Network error fetching brand data:', error);
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

        fetchData();
        fetchBrands();
    }, [Brand_ID]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBrandData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!brandData.Brand_Name || !brandData.image) {
            setFormError('Please fill in all fields.');
            return false;
        }
        return true;
    };

    const editBrand = async () => {
        if (Brand_ID) {
            if (validateForm()) {
                try {
                    const response = await fetch(`http://localhost:8080/api/edit-brand/${Brand_ID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(brandData),
                    });

                    if (response.ok) {
                        window.location.reload();
                        console.log('Brand edited successfully');
                        handleEdit();
                    } else {
                        const data = await response.json();
                        console.error('Error editing brand:', data.error || 'Unknown error');
                    }
                } catch (error) {
                    console.error('Network error editing brand:', error);
                }
            }
        } else {
            console.error('Invalid brand ID');
        }
    };

    return (
        <div>
            <button
                onClick={() => setShowEditForm(true)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded float-left mb-10"
            >
                Edit
            </button>

            {showEditForm && (
                <form className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="brandName" className="block text-sm font-medium text-black">Brand Name:</label>
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
                        <label htmlFor="image" className="block text-sm font-medium text-black">Image URL:</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={brandData.image || ''}
                            onChange={handleInputChange}
                            className="mt-1 text-black border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            if (window.confirm('Are you sure you want to save the changes?')) {
                                editBrand();
                            }
                        }}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-auto block"
                    >
                        Save Changes
                    </button>

                    {formError && <div className="text-red-500 mt-2 text-xl">{formError}</div>}
                </form>
            )}
        </div>
    );
};

export default EditComponent;
