// MOVIE, TRAILER_SHOT, TRAILER_VIDEO 테이블 관련 함수들 
const conn = require('../models/database');

async function insertData(mem_num, movie_num, stars, comments){
	var r = false;
    try{
        await conn.simpleExecute(`INSERT INTO REVIEW VALUES(REVIEW_NUM.NEXTVAL, ${movie_num}, ${mem_num}, ${stars}, '${comments}')`)

		await conn.simpleExecute(`SELECT AVG(STARS) AS AVG FROM REVIEW GROUP BY MOVIE_NUM HAVING MOVIE_NUM=${movie_num}`)
		.then(res => r=res.rows[0].AVG)

		await conn.simpleExecute(`UPDATE MOVIE SET AVG_STARS = ${r.toFixed(2)} WHERE MOVIE_NUM=${movie_num}`)
    } catch(e){
        console.log(e);
        return e.errorNum
    }
	return r;
}

async function getAllData(movie_num){
	let r = false;
    try{
        conn.simpleExecute(`SELECT REVIEW_NUM, MEM_NUM, STARS, COMMENTS FROM REVIEW WHERE MOIVE_NUM=${movie_num}`)
		.then( res => r=res )
    } catch(e){
        console.log(e);
        return e.errorNum
    }
	return r;
}

module.exports = {
    insertData: insertData,
	getAllData: getAllData,
}