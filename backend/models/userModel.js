//MEM Table, CS Table 관련 함수들 
const conn = require('../models/database'); 

async function findUser (id)  { //삽입
	return 0;
}

async function insertData (data)  { //삽입
   	const CS_NUM_sql = `SELECT CS_NUM FROM CS`;
	const MEM_NUM_sql = `SELECT MEM_NUM FROM MEM`;
	let CS_NUM, MEM_NUM;	
	
    try {
		// 추후에 시퀀스로 고쳐서 아래 ID 불러오는 거 교체하기!
		await conn.simpleExecute(CS_NUM_sql)
		.then((result)=>{
			console.log(result);
			if(result.rows.length===0) // 첫 데이터일 경우
				CS_NUM = 1;
			else
				CS_NUM=result.rows[result.rows.length-1].CS_NUM+1;
		})

		await conn.simpleExecute(MEM_NUM_sql)
		.then(result => {
			console.log(result);
			if(result.rows.length===0) // 첫 데이터일 경우
				MEM_NUM = 1;
			else
				MEM_NUM=result.rows[result.rows.length-1].MEM_NUM+1;
		})

		const cssql = `INSERT INTO CS VALUES(${CS_NUM}, '${data.name}', to_date(${data.birth}, 'yyyy-mm-dd'), '${data.phone}', '20001')`;
		const memsql = `INSERT INTO MEM VALUES(9, ${CS_NUM}, '${data.regnum}', '${data.id}', '${data.password}', 0)`;

		await conn.simpleExecute(cssql)
		await conn.simpleExecute(memsql)

    } catch(e) {
		return e
    }
	return "success"
}

module.exports = {
    insertData : insertData,
	findUser: findUser
}