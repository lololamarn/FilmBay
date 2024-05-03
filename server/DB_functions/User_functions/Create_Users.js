const { executeQuery } = require('../DB_Config');
const bcrypt = require('bcryptjs');

async function createUser(email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO Users (Mail, Password) VALUES (?, ?)`;
        const params = [email, hashedPassword];
        const result = await executeQuery(query, params);
        return result;
    } catch (error) {
        throw error;
    }
}


async function getUserByEmail(email) {
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

module.exports = { createUser, getUserByEmail };
