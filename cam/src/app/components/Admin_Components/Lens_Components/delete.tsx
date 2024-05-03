import React from 'react';

interface DeleteComponentProps {
    handleDelete: () => void;
    Lens_ID: string | undefined;
    handleDeleteLens: (Lens_ID: string | undefined) => Promise<void>;
}

const DeleteComponent: React.FC<DeleteComponentProps> = ({ handleDelete, Lens_ID, handleDeleteLens }) => {
    const deleteLens = async () => {
     
        if (Lens_ID) {
          
            const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar este registro?');
            if (confirmDelete) {
                try {
                    await handleDeleteLens(Lens_ID); 
                    handleDelete(); 
                } catch (error) {
                    console.error('Error al eliminar lente:', error);
                }
            }
        } else {
            console.error('ID de lente no válido');
        }
    };

    return (
        <button onClick={deleteLens} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-left mb-10">
            Eliminar
        </button>
    );
};

export default DeleteComponent;
