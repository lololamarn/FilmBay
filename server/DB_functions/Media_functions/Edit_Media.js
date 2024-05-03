const { executeQuery } = require('../DB_Config');

async function editMedia(Media_ID, Keyword, Brand_ID, Camera_ID, Lens_ID, Img_URL) {
    try {
        const query = `UPDATE Media SET Keyword = ?, Brand = ?, Camera = ?, Lens = ?, Img_URL = ? WHERE Media_ID = ?`;
        const params = [Keyword, Brand_ID, Camera_ID, Lens_ID, Img_URL, Media_ID];
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

module.exports = { editMedia };
