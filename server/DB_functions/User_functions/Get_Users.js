const bcrypt = require('bcryptjs');
const { executeQuery } = require('../DB_Config');

async function authenticateUser(email, password) {
    try {
        const query = `SELECT * FROM Users WHERE Mail = ?`;
        const params = [email];
        const rows = await executeQuery(query, params);

        if (rows.length === 0) {
            return null;
        }

        const user = rows[0];
        const isPasswordMatch = await bcrypt.compare(password, user.Password);

        if (isPasswordMatch) {
            return user; 
        } else {
            return null; 
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { authenticateUser };
