const { executeQuery } = require('../DB_Config');

function getMedia() {
    return new Promise(async (resolve, reject) => {
        try {
            const query = "SELECT * FROM Media";
            const rows = await executeQuery(query, []);
            resolve(rows);
        } catch (error) {
            reject(error);
        }
    });
}



async function getMediaById(Media_ID) {
    try {
        const query = "SELECT * FROM Media WHERE Media_ID = ?";
        const params = [Media_ID];
        const rows = await executeQuery(query, params);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getMediaByKeyword(searchTerm) {
    try {
        const query = `SELECT * FROM Media WHERE Keyword LIKE ?`;
        const params = [`%${searchTerm}%`];
        const lens = await executeQuery(query, params);
        return lens;
    } catch (error) {
        throw error;
    }
}

async function getMediaByBrand(Brand_ID) {
    try {
        const query = `SELECT * FROM Media WHERE Brand = ?`;
        const params = [Brand_ID];
        const media = await executeQuery(query, params);
        return media;
    } catch (error) {
        throw error;
    }
}

async function getMediaByCamera(Camera_ID) {
    try {
        const query = `SELECT * FROM Media WHERE Camera = ?`;
        const params = [Camera_ID];
        const media = await executeQuery(query, params);
        return media;
    } catch (error) {
        throw error;
    }
}

async function getMediaByLens(Lens_ID) {
    try {
        const query = `SELECT * FROM Media WHERE Lens = ?`;
        const params = [Lens_ID];
        const media = await executeQuery(query, params);
        return media;
    } catch (error) {
        throw error;
    }
}

module.exports = { getMedia, getMediaById, getMediaByBrand, getMediaByCamera, getMediaByLens, getMediaByKeyword };
