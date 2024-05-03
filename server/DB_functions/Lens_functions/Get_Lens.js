const { executeQuery } = require('../DB_Config');

function getLenses() {
    return new Promise(async (resolve, reject) => {
        try {
            const query = "SELECT * FROM Lenses";
            const rows = await executeQuery(query, []);
            resolve(rows);
        } catch (error) {
            reject(error);
        }
    });
}

async function getLensById(Lens_ID) {
    try {
        const query = "SELECT * FROM Lenses WHERE Lens_ID = ?";
        const params = [Lens_ID];
        const rows = await executeQuery(query, params);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getLensByLensName(searchTerm) {
    try {
        const query = `SELECT * FROM Lenses WHERE Lens_Name LIKE ?`;
        const params = [`%${searchTerm}%`];
        const lens = await executeQuery(query, params);
        return lens;
    } catch (error) {
        throw error;
    }
}

module.exports = { getLenses, getLensById, getLensByLensName };
