const { executeQuery } = require('../DB_Config');

async function editLens(Lens_ID, Lens_Name, Brand_ID, Mount, Focal_length, Detalles) {
    try {
        const query = `UPDATE Lenses SET Lens_Name = ?, Brand = ?, Mount = ?, Focal_length = ?, Detalles = ? WHERE Lens_ID = ?`;
        const params = [Lens_Name, Brand_ID, Mount, Focal_length, Detalles, Lens_ID];
        const result = await executeQuery(query, params);

        if (result.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { editLens };
