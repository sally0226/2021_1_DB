//MEM Table, CS Table 관련 함수들 
const conn = require('../models/database');

async function Login (id, password) {
	let r = 0;
	let userRow = '';
	let CS_NUM;
	
	await conn.simpleExecute(`SELECT * FROM MEM WHERE MEM_ID='${id}'`)
	.then(result=>{
		if(result.rows.length>0){
			userRow = result.rows;
			r = userRow
		}
		CS_NUM = r[0].CS_NUM
	})

	await conn.simpleExecute(`SELECT CS_CLASSIFY_CODE FROM CS WHERE CS_NUM=${CS_NUM}`)
	.then(res => r.push(res.rows[0]))
	
	return r;
}

async function findUser ({id, regnum})  {
	let r = 0;
	await conn.simpleExecute(`SELECT * FROM MEM WHERE MEM_ID='${id}'`)
	.then(result=>{
		if(result.rows.length>0){
			r="이미 존재하는 id입니다."
		}
	})
	await conn.simpleExecute(`SELECT * FROM MEM WHERE MEM_ID='${regnum}'`)
	.then(result=>{
		if(result.rows.length>0)
			r="이미 존재하는 주민번호입니다."
	})
	return r;
}

async function insertData (data)  {
	let CS_NUM;

	try{
		const cssql = `INSERT INTO CS VALUES(CS_NUM.NEXTVAL, '${data.name}', to_date(${data.birth}, 'yyyy-mm-dd'), '${data.phone}', '20001')`;

		await conn.simpleExecute(cssql)

		await conn.simpleExecute(`SELECT LAST_NUMBER FROM USER_SEQUENCES WHERE SEQUENCE_NAME = 'CS_NUM'`)
		.then(res => CS_NUM = result.rows[0].LAST_NUMBER-1)

		const memsql = `INSERT INTO MEM VALUES(MEM_NUM.NEXTCAL, ${CS_NUM}, '${data.regnum}', '${data.id}', '${data.password}', 0)`;
		await conn.simpleExecute(memsql)

    } catch(e) {
		//console.log(e); // 에러 출력
		return e.errorNum
    }
	return "success"
}

async function Enter (name, contact, room)  {
	let r = 0;
	let date = new Date();
	var yyyy = date.getFullYear();
	var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1); // getMonth() is zero-based
	var dd  = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var day = "".concat(yyyy).concat("").concat(mm).concat("").concat(dd).concat(hh).concat(min).concat('00');

	try{
		const esql = `INSERT INTO VISIT_INFO VALUES(VISIT_NUM.NEXTVAL, ${room}, '${name}', '${contact}',TO_DATE('${day}','YYYYMMDDHH24MISS'))`
		await conn.simpleExecute(esql)
		.then(res => r="success");
	} catch (e) {
		console.log(e)
		return e.errorNum
	}
	return r;
}

async function GetEnter ()  {
	let r = 0;

	try{
		const esql = `SELECT * FROM VISIT_INFO`
		await conn.simpleExecute(esql)
		.then(res => r=res);
	} catch (e) {
		console.log(e)
		return e.errorNum
	}
	return r;
}

module.exports = {
    insertData : insertData,
	findUser: findUser,
	Login: Login,
	Enter: Enter,
	GetEnter: GetEnter,
}