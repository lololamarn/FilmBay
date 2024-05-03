const { executeQuery } = require('../DB_Config');

async function getCameraByBrandID(Brand_ID) {
    try {
        const query = `SELECT * FROM Cameras WHERE Brand = ?`;
        const params = [Brand_ID];
        const cameras = await executeQuery(query, params);
        return cameras;
    } catch (error) {
        throw error;
    }
}

async function getLensByBrandID(Brand_ID) {
    try {
        const query = `SELECT * FROM Lenses WHERE Brand = ?`;
        const params = [Brand_ID];
        const lenses = await executeQuery(query, params);
        return lenses;
    } catch (error) {
        throw error;
    }
}

async function getMediaByBrandID(Brand_ID) {
    try {
        const query = `SELECT * FROM Media WHERE Brand = ?`;
        const params = [Brand_ID];
        const media = await executeQuery(query, params);
        return media;
    } catch (error) {
        throw error;
    }
}

async function getBrandByBrandID(Brand_ID) {
    try {
        const query = `SELECT * FROM Brand WHERE Brand_ID = ?`;
        const params = [Brand_ID];
        const brand = await executeQuery(query, params);
        return brand;
    } catch (error) {
        throw error;
    }
}

module.exports = {getCameraByBrandID,getLensByBrandID,getMediaByBrandID, getBrandByBrandID};