//dept 테이블 관련 
const conn = require('../models/database');

async function selectAllDept(){
    const sql = `SELECT * FROM DEPT`
    var data; 
    try {
        await conn.simpleExecute(sql).then((result) => {
            console.log(result.rows);
            data = result.rows;
        });
        return data;
    } catch(e) {
        return e.errorNum;
    }
}

async function nameToNum(name) {
    const sql = `SELECT DEPT_NUM FROM DEPT WHERE DEPT_NAME = '${name}'`;
    var deptNum;
    try {
        await conn.simpleExecute(sql).then((result) => {
            //console.log(result);
            deptNum = result.rows[0].DEPT_NUM;
        })
        //console.log(deptNum);
        return deptNum;
    } catch(e) {
        return e.errorNum;
    }
}

module.exports = {
    selectAllDept: selectAllDept,
    nameToNum: nameToNum, 
}