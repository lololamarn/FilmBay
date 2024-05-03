const { executeQuery } = require('../DB_Config');

async function deleteMedia(media_ID) {
    try {
        const query = `DELETE FROM Media WHERE Media_ID = ?`;
        const params = [media_ID];

        const result = await executeQuery(query, params);

        if (result && result.affectedRows === 1) {
            return { deletedCount: 1 };
        } else {
            return { deletedCount: 0 };
        }
    } catch (error) {
        console.error('Error deleting media:', error);
        throw new Error('Error al eliminar el registro de media');
    }
}

module.exports = { deleteMedia };
