const { executeQuery } = require('../DB_Config');

async function addMedia( Keyword, Brand_ID, Camera_ID, Lens_ID, Img_URL) {
    try {
        const query = `INSERT INTO Media (Keyword, Brand, Camera, Lens, Img_URL) VALUES (?, ?, ?, ?, ?)`;
        const params = [ Keyword, Brand_ID, Camera_ID, Lens_ID, Img_URL];
        const result = await executeQuery(query, params);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { addMedia };
