const { executeQuery } = require('../DB_Config');

async function addLens(Lens_Name, Brand_ID, Mount, Focal_length, Detalles) {
    try {
        const query = `INSERT INTO Lenses (Lens_Name, Brand, Mount, Focal_length, Detalles) VALUES (?, ?, ?, ?, ?)`;
        const params = [Lens_Name, Brand_ID, Mount, Focal_length, Detalles];
        const result = await executeQuery(query, params);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { addLens };
