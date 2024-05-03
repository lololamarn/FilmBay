import React from 'react';

interface DeleteComponentProps {
    handleDelete: () => void;
    Media_ID: string | undefined; 
    handleDeleteMedia: (Media_ID: string | undefined) => Promise<void>;
}

const DeleteComponent: React.FC<DeleteComponentProps> = ({ handleDelete, Media_ID, handleDeleteMedia }) => {
    const deleteMedia = async () => {
        
        if (Media_ID) {
           
            const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar este registro?');
            if (confirmDelete) {
                try {
                    await handleDeleteMedia(Media_ID); 
                    handleDelete(); 
                } catch (error) {
                    console.error('Error al eliminar media:', error);
                }
            }
        } else {
            console.error('ID de media no válido');
        }
    };

    return (
        <button onClick={deleteMedia} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-left mb-10">
            Eliminar
        </button>
    );
};

export default DeleteComponent;
