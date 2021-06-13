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


 module.exports = {
	getMovieRatingCode: getMovieRatingCode,
}