// DB Pool 관련 파일 

const oracledb = require('oracledb'); // nodejs에서 제공하는 oracledb용 라이브러리 
const dbConfig = require('../config/dbConfig'); // 연결 설정 정보 담고있는 config file 

async function initialize() { // 맨 처음에 풀을 생성하는 함수 
  const pool = await oracledb.createPool(dbConfig.hrPool);
}
module.exports.initialize = initialize;

async function close() { // 연결을 가져다쓰고 다시 돌려주는 함수 
    await oracledb.getPool().close();
}
  
module.exports.close = close;

function simpleExecute(statement, binds = [], opts = {}) { //statement (sql 구문)을 실행하는 함수 
    return new Promise(async (resolve, reject) => {
			let conn;

			opts.outFormat = oracledb.OBJECT;
			opts.autoCommit = true;

			try {
				conn = await oracledb.getConnection(); // 위에 init함수에서 생성한 pool에서 연결을 가져옴 

				const result = await conn.execute(statement, binds, opts); //sql 구문 실행 

				resolve(result);
			} catch (err) {
				reject(err);
			} finally {
				if (conn) { // conn assignment worked, need to close
					try {
						await conn.close();
					} catch (err) {
						console.log(err);
					}
				}
			}
		}
	);
}
  
module.exports.simpleExecute = simpleExecute;