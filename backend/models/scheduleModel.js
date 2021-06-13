const conn = require('../models/database');

function getFormatDate(dates){
    const date = new Date(dates);
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    var hours = date.getHours();
    var mins = date.getMinutes();
    return  year + '-' + month + '-' + day+'-'+hours+'-'+mins;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}
async function insertData(data){
    try {
    //    console.log(data);
    //    console.log(getFormatDate(data.SCRN_DATE));
        const sql = `INSERT INTO SCHEDULE VALUES(
                        SCHEDULE_NUM.NEXTVAL, 
                        ${data.MOVIE_NUM},
                        ${data.ROOM_NUM}, 
                        TO_DATE('${getFormatDate(data.SCRN_DATE)}', 'YYYY-MM-DD-HH24-MI'),
                        TO_DATE('${getFormatDate(data.SCRN_DATE)}', 'YYYY-MM-DD-HH24-MI'),
                        (SELECT TOTAL_SEAT_CAP from SCRN_ROOM where ROOM_NUM =${data.ROOM_NUM}))`;
        await conn.simpleExecute(sql);
        return "success";
    } catch(e) {
        console.log(e);
        return e;
    }
}

async function updateData(schedule_num, data){
    try{
        // console.log(data);
        const sql = `UPDATE SCHEDULE SET MOVIE_NUM=${data.MOVIE_NUM}, ROOM_NUM=${data.ROOM_NUM}, SCRN_DATE=TO_DATE('${getFormatDate(data.SCRN_DATE)}', 'YYYY-MM-DD-HH24-MI') WHERE SCHEDULE_NUM = ${schedule_num}`
        await conn.simpleExecute(sql);
        return "success";
    }catch(e) {
        console.log(e);
        return e;
    }
}

async function deleteData(schedule_num) {
    try{
        // console.log("delete");
        const sql = `DELETE FROM SCHEDULE WHERE SCHEDULE_NUM = ${schedule_num}`;
        await conn.simpleExecute(sql);
        return "success";
    }catch(e) {
        console.log(e)
        return e;
    }
}

async function selectAllData() {
    try{
        const sql = `SELECT * FROM SCHEDULE`;
        var schedules;
        await conn.simpleExecute(sql).then((result) => {
            schedules = result.rows;
        });
        return schedules;
    }catch(e) {
        return e;
    }
}
module.exports = {
    insertData: insertData,
    updateData: updateData,
    deleteData: deleteData,
    selectAllData: selectAllData,
}