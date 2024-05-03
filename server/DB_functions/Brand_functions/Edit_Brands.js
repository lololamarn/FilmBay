const { executeQuery } = require('../DB_Config');

async function editBrand(Brand_ID, Brand_Name, image) {
    try {
        const query = `UPDATE Brand SET Brand_Name = ?, image = ? WHERE Brand_ID = ?`;
        const params = [Brand_Name, image, Brand_ID];
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

module.exports = { editBrand };
