
const { executeQuery } = require('../DB_Config');

async function addCamera(cameraName, brandID, mount, details) {
    try {
        const query = `INSERT INTO Cameras (Camera_Name, Brand, Mount, Detalles) VALUES (?, ?, ?, ?)`;
        const params = [cameraName, brandID, mount, details];
        const result = await executeQuery(query, params);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { addCamera };
