
const { executeQuery } = require('../DB_Config');

async function addBrand(brandName, Image) {
    try {
        const query = `INSERT INTO Brand (Brand_Name, Image) VALUES (?, ?)`;
        const params = [brandName,Image];
        const result = await executeQuery(query, params);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { addBrand };
