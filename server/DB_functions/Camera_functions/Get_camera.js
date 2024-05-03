const { executeQuery } = require('../DB_Config');

async function getCameraById(cameraId) {
    try {
        const query = `SELECT * FROM Cameras WHERE Camera_ID = ?`;
        const params = [cameraId];
        const camera = await executeQuery(query, params);
        return camera[0]; 
    } catch (error) {
        throw error;
    }
}

module.exports = { getCameraById };
