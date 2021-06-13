const conn = require('./models/database');
const database = require('./models/database');

/* DB OPEN */
async function initDB()  {
	try {
		console.log('Initializing database module');
		await database.initialize();

		// 데이터 삭제 sql
		// deleteData();

		// insert admin data
		// insertAdmin();
	} catch (err) {
		console.error(err);
		process.exit(1); // Non-zero failure code
	}
}

async function deleteData() {
	await conn.simpleExecute(`DELETE MEM`);
	await conn.simpleExecute(`DELETE CS`);
	await conn.simpleExecute(`DELETE TRAILER_SHOT`);
	await conn.simpleExecute(`DELETE TRAILER_VIDEO`);
	await conn.simpleExecute(`DELETE MOVIE`);
}

async function insertAdmin() {
	try {
		var cs_num;

		await conn.simpleExecute(`INSERT INTO CS VALUES(CS_NUM.NEXTVAL, '관리자', TO_DATE('19980101', 'yyyy-mm-dd'), '01000000000', 20003)`)

		await conn.simpleExecute(`SELECT LAST_NUMBER FROM USER_SEQUENCES WHERE SEQUENCE_NAME = 'CS_NUM'`)
		.then(result => cs_num = result.rows[0].LAST_NUMBER-1)

		await conn.simpleExecute(`INSERT INTO MEM VALUES(MEM_NUM.NEXTVAL, ${cs_num},'9801012222222','cdb','$2b$10$9TIj5m8wpywVO0uRIoh.s.SAKbAUuUv8VCANyUqBo90ZiseuZfivK',0)`)
	} catch (e) {
		console.log(e);
		return e.errorNum
	}
}

/* DB CLOSE */
async function close() {
	try {
		console.log('Closing database module');
	  
		await database.close(); 
	} catch (err) {
		console.log('Encountered error', e);
	  
		err = err || e;
	}
}

module.exports = {
    init : initDB
}