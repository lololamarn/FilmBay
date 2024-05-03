const { executeQuery } = require('../DB_Config');

async function deleteCamera(cameraId) {
    try {
        const query = `DELETE FROM Cameras WHERE Camera_ID = ?`;
        const params = [cameraId];

        const result = await executeQuery(query, params);

        if (result && result.affectedRows === 1) {
            return { deletedCount: 1 };
        } else {
            return { deletedCount: 0 };
        }
    } catch (error) {
        console.error('Error deleting camera:', error);
        throw new Error('Error al eliminar la cámara');
    }
}

module.exports = { deleteCamera };
