const { executeQuery } = require('../DB_Config');
const bcrypt = require('bcryptjs');

async function getEmail(email) {
    try {
        const query = 'SELECT * FROM Users WHERE Mail = ?';
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

async function changePassword(email, newPassword) {
    try {

        const user = await getEmail(email);
        if (!user) {
            throw new Error('Usuario no encontrado.');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const query = 'UPDATE Users SET Password = ? WHERE Mail = ?';
        const updateParams = [hashedPassword, email];
        const updateResult = await executeQuery(query, updateParams);


    } catch (error) {
        throw error;
    }
}


module.exports = { changePassword };
