
const sql = require('msnodesqlv8');

const connectionString = "Driver={ODBC Driver 17 for SQL Server};Server=ZARC;Database=camlens;Uid=zarc;Pwd=1234;";

async function executeQuery(query, params) {
    return new Promise((resolve, reject) => {
        sql.query(connectionString, query, params, (err, rows) => {
            if (err) {
                const errorMessage = `Error al ejecutar la consulta: ${err.message}`;
                console.error(errorMessage);
                reject({ error: errorMessage });
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = { executeQuery };
