const conn = require('../models/database');
async function selectMovieRatingCode() {
	var result;
	try{
		await conn.simpleExecute(`SELECT COMMON_CODE, CODE_NAME FROM CODE WHERE UPPER_COMMON_CODE=100`)
		.then(res => {
			result = res.rows;
		})

		return result;
	} catch(e){
		console.log(e);
		return e.errorNum;
	}
}

async function selectEmc_ExitCode() {
	var result;
	try{
		await conn.simpleExecute(`SELECT COMMON_CODE, CODE_NAME FROM CODE WHERE UPPER_COMMON_CODE=400`)
		.then(res => {
			result = res.rows;
		})

		return result;
	} catch(e){
		console.log(e);
		return e.errorNum;
	}
}
module.exports = {
	selectMovieRatingCode: selectMovieRatingCode,
	selectEmc_ExitCode: selectEmc_ExitCode,
}