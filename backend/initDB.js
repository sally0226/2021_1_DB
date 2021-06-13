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

		// insert init data
		// insertInitData()
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

async function insertInitData() {
	// trailer 데이터를넣어야하넴..ㅋㅋ
	try{
		await conn.simpleExecute(`INSERT INTO MOVIE VALUES(
			             MOVIE_NUM.NEXTVAL,
			             '크루엘라',
			             133,
			             '크레이그 질레스피',
			             '엠마스톤, 엠마톰슨',
			             '드라마,범죄,코미디',
			             '처음부터 난 알았어. 내가 특별하단 걸
			 그게 불편한 인간들도 있겠지만 모두의 비위를 맞출 수는 없잖아?
			 그러다 보니 결국, 학교를 계속 다닐 수가 없었지
			
			 우여곡절 런던에 오게 된 나, 에스텔라는
			 재스퍼와 호레이스를 운명처럼 만났고
			 나의 뛰어난 패션 감각을 이용해
			 완벽한 변장과 빠른 손놀림으로 런던 거리를 싹쓸이 했어',
			             DEFAULT,
			             '미국',
			             TO_DATE('2021-05-26', 'YYYY-MM-DD'),
			             NULL,
			             10002
			             )`)

		await conn.simpleExecute(` INSERT INTO MOVIE VALUES(
			             MOVIE_NUM.NEXTVAL,
			             '노매드랜드',
			             108,
			             '클로이 자오',
			             '프란시스 맥도맨드',
			             '드라마',
			             '전 세계가 동행한 가슴 벅찬 여정, 길이 계속되는 한 우리의 삶도 계속된다.
			 모든 것이 무너진 후에야 비로소 열리는 새로운 길 그리고 희망
			
			 경제적 붕괴로 도시 전체가 무너진 후
			 홀로 남겨진 ‘펀’.(프란시스 맥도맨드)
			 추억이 깃든 도시를 떠나 작은 밴과 함께
			 한 번도 가보지 않은 낯선 길 위의 세상으로 떠난다.',
			             DEFAULT,
			             '미국',
			             TO_DATE('2021-04-15', 'YYYY-MM-DD'),
			             NULL,
			             10002
			             )`)
		
	} catch(e) {
		console.log(e);
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