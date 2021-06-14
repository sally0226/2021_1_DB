const codeModel = require('../models/codeModel')

const getMovieRatingCode = async (req, res, next) => {
	// console.log("getAllMovie");
	 try {
		 const result = await codeModel.selectMovieRatingCode();
		 if (result === undefined)
			res.status(200).json({ success: false, message: '설정한 상영등급이 없습니다.'});
		res.send(result)
	 } catch(err) {
		 next(err);
	 }
 }

 const getEmc_ExitCode = async (req, res, next) => {
	// console.log("getAllMovie");
	 try {
		 const result = await codeModel.selectEmc_ExitCode();
		 if (result === undefined)
			res.status(200).json({ success: false, message: '설정한 비상구 위치가 없습니다.'});
		res.send(result);
	 } catch(err) {
		 next(err);
	 }
 }

 const getDCCode = async (req, res, next) => {
	 try {
		 const result = await codeModel.selectDCCode();
		 if (result === undefined)
			res.status(200).json({ success: false, message: '할인 항목이 없습니다.'});
		res.send(result);
	 } catch(err) {
		 next(err);
	 }
 }

 module.exports = {
	getMovieRatingCode: getMovieRatingCode,
	getEmc_ExitCode: getEmc_ExitCode,
	getDCCode:getDCCode,
}