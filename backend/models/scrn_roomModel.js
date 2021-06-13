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

async function selectRoomID(){
    try {
        const sql = `SELECT ROOM_NUM FROM SCRN_ROOM`;
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
	selectRoomID: selectRoomID
}