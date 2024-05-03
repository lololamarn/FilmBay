const { executeQuery } = require('../DB_Config');

async function editCamera(cameraId, cameraName, brand, mount, detalles) {
    try {
        const query = `UPDATE Cameras SET Camera_Name = ?, Brand = ?, Mount = ?, Detalles = ? WHERE Camera_ID = ?`;
        const params = [cameraName, brand, mount, detalles, cameraId];
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

module.exports = { editCamera };
