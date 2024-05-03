const { executeQuery } = require('../DB_Config');
const bcrypt = require('bcryptjs');

async function getEmail(email) {
    try {
        const query = `SELECT * FROM Users WHERE Mail = ?`;

        const params = [email];
        const rows = await executeQuery(query, params);

        if (rows.length > 0) {

            return rows[0];

        } else {
            return null;
        }
    } catch (error) {

        throw error;
    }
}



module.exports = { getEmail};
