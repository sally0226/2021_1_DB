const bcrypt = require('bcrypt');
const reviewModel = require('../models/reviewModel');

const createReview = async (req, res, next) => {
    try {
        const { mem_num, movie_num, stars, comments } = req.body;

        const result = await movieModel.insertData(mem_num, movie_num, stars, comments);
        //console.log(result);
        if(result === "success")
		    res.status(201).json({ success: true});
        else {
            res.status(200).json({ success: false, message: '생성 에러'});
	    }
    } catch(err) {
        next(err)
    }
}

const getReview = async (req,res,next) => {
	const { movie_num } = req.body;
	try {
        const result = await movieModel.getAllData(movie_num);
        //console.log(result);
		if (result === false)
			res.status(200).json({ success: false, message: '리뷰 요청에 실패했습니다.'});
        res.status(200).json(result);
    } catch(err) {
        next(err)
    }
}


module.exports = {
    createReview: createReview,
	getReview: getReview,
}