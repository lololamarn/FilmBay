const { executeQuery } = require('../DB_Config');

async function deleteBrand(brandId) {
    try {
        const query = `DELETE FROM Brand WHERE Brand_ID = ?`;
        const params = [brandId];

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

module.exports = { deleteBrand };
