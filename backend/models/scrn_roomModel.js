const conn = require('../models/database');

async function selectAllData(){
    try {
        const sql = `SELECT * FROM SCRN_ROOM`;
        var rooms;
        await conn.simpleExecute(sql).then((result) => {
            console.log(result);
            rooms = result.rows;
        })
        return rooms;
    } catch(e){
        return e
    }
}

module.exports = {
    selectAllData: selectAllData,
}