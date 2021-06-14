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
		else if(result===-1) {
            res.status(200).json({ success: false, message: '리뷰 작성는 하나만 작성할 수 있습니다.'});
	    }
		else {
			res.status(200).json({ success: true})
		}
    } catch(err) {
        next(err)
    }
}

const getReview = async (req,res,next) => {
	const { movie_num } = req.params;
	try {
		console.log(movie_num);
        const result = await reviewModel.getAllData(movie_num);
        //console.log(result);
		if (result === false)
			res.status(200).json({ success: false, message: '리뷰 요청에 실패했습니다.'});
        else res.status(200).json(result);
    } catch(err) {
        next(err)
    }
}

const deletetReview = async (req,res,next) => {
	const { review_num } = req.params;
	try {
        const result = await reviewModel.deleteData(review_num);
        //console.log(result);
		if (result === false)
			res.status(200).json({ success: false, message: '리뷰 삭제에 실패했습니다.'});
        else res.status(200).json({ success: true, message: '리뷰 삭제에 성공했습니다.'});
    } catch(err) {
        next(err)
    }
}

const updateReview = async (req,res,next) => {
	const { comments, review_num, stars } = req.body;
	try {
        const result = await reviewModel.editData(comments, review_num, stars);
        //console.log(result);
		if (result === false)
			res.status(200).json({ success: false, message: '리뷰 수정에 실패했습니다.'});
        else res.status(200).json({ success: true, message: '리뷰를 수정하였습니다.'});
    } catch(err) {
        next(err)
    }
}

module.exports = {
    createReview: createReview,
	getReview: getReview,
	deletetReview: deletetReview,
	updateReview: updateReview
}