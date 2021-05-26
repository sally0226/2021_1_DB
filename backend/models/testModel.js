const conn = require('../models/database');

async function insertData (data)  {
    const sql = `INSERT INTO TEST VALUES(${data.id}, '${data.data}')`;
    console.log(sql);
    try {
        await conn.simpleExecute(sql);
    } catch(e) {
        console.error(e);
    }
}

module.exports = {
    insertData : insertData
}