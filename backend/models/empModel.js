// emp, dept 관련 
const conn = require('../models/database');
const deptModel = require('./deptModel');

function getFormatDate(date){
    date = new Date(date);
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

async function insertData(data){
    //console.log(data.startDate);
    try {
        const sql = `INSERT INTO EMP VALUES(EMP_NUM.NEXTVAL, ${data.dept}, '${data.name}', '${data.contact}', '${data.reg_num}', TO_DATE('${getFormatDate(data.startDate)}', 'YYYY-MM-DD'), '${data.title}')`;
        await conn.simpleExecute(sql);
    } catch(e) {
        return e;
    }
    return "success";
}

async function selectAllEmp() {
    try {
        var empList; 
        const sql = `SELECT * FROM EMP`;
        await conn.simpleExecute(sql).then((result) => {
            //console.log(result);
            empList = result.rows;
        });
        return empList;
    } catch(e) {
        return e;
    }
}

module.exports = {
    insertData: insertData,
    selectAllEmp: selectAllEmp, 
}