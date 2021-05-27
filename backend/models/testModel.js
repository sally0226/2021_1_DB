// test Model (test table) 관련 함수들 
const conn = require('../models/database'); 

async function insertData (data)  { //삽입
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