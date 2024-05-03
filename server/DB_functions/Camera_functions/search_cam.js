const { executeQuery } = require('../DB_Config');

async function searchCameras(searchTerm) {
    try {
        const query = `SELECT * FROM Cameras WHERE Camera_Name LIKE ?`;
        const params = [`%${searchTerm}%`];
        const cameras = await executeQuery(query, params);
        return cameras;
    } catch (error) {
        throw error;
    }
}

function getCameras() {
    return new Promise(async (resolve, reject) => {
        try {
            const query = "SELECT * FROM Cameras"; 
            const rows = await executeQuery(query, []);
            resolve(rows); 
        } catch (error) {
            reject(error); 
        }
    });
}



module.exports = {searchCameras, getCameras};
