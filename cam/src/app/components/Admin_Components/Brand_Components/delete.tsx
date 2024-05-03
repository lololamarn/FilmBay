import React from 'react';

interface DeleteComponentProps {
    handleDelete: () => void; 
    Brand_ID: string | undefined; 
    handleDeleteCamera: (Brand_ID: string | undefined) => Promise<void>; 
}

const DeleteComponent: React.FC<DeleteComponentProps> = ({ handleDelete, Brand_ID, handleDeleteCamera }) => {
    const deleteCamera = async () => {
        
        if (Brand_ID) {
            
            const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar este registro?');
            if (confirmDelete) {
                try {
                    await handleDeleteCamera(Brand_ID); 
                    handleDelete();
                } catch (error) {
                    console.error('Error al eliminar cámara:', error);
                }
            }
        } else {
            console.error('ID de cámara no válido');
        }
    };

    return (
        <button onClick={deleteCamera} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-left mb-10">
            Eliminar
        </button>
    );
};

export default DeleteComponent;
