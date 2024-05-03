const { executeQuery } = require('../DB_Config');

async function deleteLens(lens_ID) {
    try {
        const query = `DELETE FROM Lenses WHERE Lens_ID = ?`;
        const params = [lens_ID];

        const result = await executeQuery(query, params);

        if (result && result.affectedRows === 1) {
            return { deletedCount: 1 };
        } else {
            return { deletedCount: 0 };
        }
    } catch (error) {
        console.error('Error deleting brand:', error);
        throw new Error('Error al eliminar la marca');
    }
}

module.exports = { deleteLens };
