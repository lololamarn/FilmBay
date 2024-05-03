

const { executeQuery } = require('../DB_Config');

function getBrands() {
    return new Promise(async (resolve, reject) => {
        try {
            const query = "SELECT * FROM Brand";
            const rows = await executeQuery(query, []);
            resolve(rows);
        } catch (error) {
            reject(error);
        }
    });
}

async function getBrandById(brandId) {
    try {
        const query = "SELECT * FROM Brand WHERE Brand_ID = ?";
        const params = [brandId];
        const rows = await executeQuery(query, params);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getBrandByBrandName(searchTerm) {
    try {
        const query = `SELECT * FROM Brand WHERE Brand_Name LIKE ?`;
        const params = [`%${searchTerm}%`];
        const brand = await executeQuery(query, params);
        return brand;
    } catch (error) {
        throw error;
    }
}

module.exports = { getBrands, getBrandById, getBrandByBrandName };
