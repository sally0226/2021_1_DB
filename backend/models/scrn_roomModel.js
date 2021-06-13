const conn = require('../models/database');

async function selectAllData(){
    try {
        const sql = `SELECT * FROM SCRN_ROOM`;
        var rooms;
        await conn.simpleExecute(sql).then((result) => {
            // console.log(result);
            rooms = result.rows;
        })
        const exitSql = `SELECT * FROM EMC_EXIT`;
        var exits;
        await conn.simpleExecute(exitSql).then((result) => {
            // console.log(result);
            exits = result.rows;
        })
        console.log(exits);
        return {rooms: rooms, exits: exits};
    } catch(e){
        console.log(e);
        return e
    }
}

async function insertData(data){
    console.log(data);
    try {
        const sql = `INSERT INTO SCRN_ROOM VALUES(ROOM_NUM.NEXTVAL, '${data.ROOM_NAME}', ${data.ROW_NUM * data.COL_NUM}, ${data.ROW_NUM}, ${data.COL_NUM})`;
        await conn.simpleExecute(sql);
    }catch(e){
        console.log(e);
        return e
    }
    return "success";
}

async function deleteData(room_num) {
    try {
        const sql = `DELETE FROM SCRN_ROOM WHERE ROOM_NUM=${room_num}`;
        await conn.simpleExecute(sql);
    }catch(e){
        console.log(e);
        return e
    }
    return "success";
}
module.exports = {
    selectAllData: selectAllData,
    insertData: insertData,
    deleteData: deleteData,
}