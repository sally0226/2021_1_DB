const reviewModel = require('../models/reviewModel');

const createReview = async (req, res, next) => {
    try {
        const { mem_num, movie_num, stars, comments } = req.body;

        const result = await reviewModel.insertData(mem_num, movie_num, stars, comments);
        //console.log(result);
        if(result===1400)
		    res.status(201).json({ success: false, message: '로그인한 회원만 리뷰 할 수 있습니다.' });
        else if(result===false) {
            res.status(200).json({ success: false, message: '리뷰 작성에 실패하였습니다.'});
	    }
		else {
			res.status(200).json({ success: true})
		}
    } catch(err) {
        next(err)
    }
}

const getReview = async (req,res,next) => {
	const { movie_num } = req.body;
	try {
        const result = await reviewModel.getAllData(movie_num);
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