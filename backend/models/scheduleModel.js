const conn = require('../models/database');

function getFormatDateTime(dates){
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
function getFormatDate(dates){
    const date = new Date(dates);
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    var hours = date.getHours();
    var mins = date.getMinutes();
    return  year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

async function roomIsEmpty(data) {
    const checkSql = `SELECT TO_CHAR(SC.SCRN_DATE,'HH24:MI') AS TIME , MO.SCRN_TIME ,SC.MOVIE_NUM FROM SCHEDULE SC ,MOVIE MO WHERE ${data.ROOM_NUM}=SC.ROOM_NUM AND '${getFormatDate(data.SCRN_DATE)}'=TO_CHAR(SC.SCRN_DATE, 'YYYY-MM-DD') AND MO.MOVIE_NUM = SC.MOVIE_NUM`;
    var schelist;
    await conn.simpleExecute(checkSql).then(result => {
        console.log(result);
        schelist = result.rows;
    });
    const movieSql = `SELECT SCRN_TIME FROM MOVIE WHERE MOVIE_NUM = ${data.MOVIE_NUM}`;
    var scrn_time;
    await conn.simpleExecute(movieSql).then(result => {
        console.log(result);
        scrn_time = result.rows[0].SCRN_TIME;
    });
    const gap = 10; //상영일정간 최소간격  
    const start_times = schelist.map(sche => Number(sche.TIME[0]+sche.TIME[1])*60 + Number(sche.TIME[3]+sche.TIME[4]));
    const end_times = start_times.map((start_time, idx)=> start_time + schelist[idx].SCRN_TIME);
    const start = Number(new Date(data.SCRN_DATE).getHours()) * 60 + Number(new Date(data.SCRN_DATE).getMinutes());
    const end = start + scrn_time + gap; 

    var isCan = true;
    for (var i=0;i<start_times.length;i++){
        if (start >= start_times[i] && start <= end_times[i])
            isCan = false;
        if (end >= start_times[i] && end <= end_times[i])
            isCan = false; 
    }
    return isCan;
}
async function insertData(data){
    try {
 
        //해당 시간에 해당 상영관이 비어있는지 검사 
        const isCanInsert = await roomIsEmpty(data);
        const sql = `INSERT INTO SCHEDULE VALUES(
                        SCHEDULE_NUM.NEXTVAL, 
                        ${data.MOVIE_NUM},
                        ${data.ROOM_NUM}, 
                        TO_DATE('${getFormatDateTime(data.SCRN_DATE)}', 'YYYY-MM-DD-HH24-MI'),
                        (SELECT TOTAL_SEAT_CAP from SCRN_ROOM where ROOM_NUM =${data.ROOM_NUM}))`;
        if (isCanInsert)
            await conn.simpleExecute(sql);
        else 
            return "cant";
        return "success";
    } catch(e) {
        console.log(e);
        return e;
    }
}

async function updateData(schedule_num, data){
    try{
        console.log(data);
        const isCanUpdate = await roomIsEmpty(data);
        const sql = `UPDATE SCHEDULE SET MOVIE_NUM=${data.MOVIE_NUM}, ROOM_NUM=${data.ROOM_NUM}, SCRN_DATE=TO_DATE('${getFormatDateTime(data.SCRN_DATE)}', 'YYYY-MM-DD-HH24-MI') WHERE SCHEDULE_NUM = ${schedule_num}`
        
        if (isCanUpdate) 
            await conn.simpleExecute(sql);
        else 
            return "cant";
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