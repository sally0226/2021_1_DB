// MEM Table, CS Table 관련 함수들 
const conn = require('../models/database'); 

async function findUser (id)  { //삽입
	// num, name, birth, phone, code(20001)
	// num, csnum, regnum, id, password, point
	return 0;
}

async function insertData (data)  { //삽입
	// num, name, birth, phone, code(20001)
	// num, csnum, regnum, id, password, point
    const cssql = `INSERT INTO CS VALUES(1, '${data.name}', '${new Date()}', '${data.phone}', '20001')`;
	const memsql = `INSERT INTO MEM VALUES(1, 1, '${data.regnum}', '${data.id}', '${data.password}', 0)`;
    console.log(sql);
    try {
        await conn.simpleExecute(sql);
    } catch(e) {
        console.error(e);
    }
}

module.exports = {
    insertData : insertData,
	findUser: findUser
}