const bcrypt = require('bcrypt');
const movieModel = require('../models/movieModel');

const createMovie = async (req, res, next) => {
    try {
        const { movie, images, videos } = req.body;

        const movieData = movie;
        const result = await movieModel.insertData(movieData, images, videos);
        console.log(result);
        if(result === "success")
		    res.status(201).json({ success: true});
        else {
            res.status(200).json({ success: false, message: '이것은 에러'});
	    }
    } catch(err) {
        next(err)
    }
}

const getAllMovie = async (req, res, next) => {
   // console.log("getAllMovie");
    try {
        const result = await movieModel.selectAllMovie();
        if (result === undefined)
            res.status(200).json({ success: false, message: '이것은 에러'});
        res.send(result)
    } catch(err) {
        next(err);
    }
}

// 영화 상세보기 페이지
const getOneMovie = async (req, res, next) => {
	const id = req.params.id;
	try {
		const result = await movieModel.selectOneMovie(id);
		if(result === "failed")
			res.status(200).json({ success: false, message:'영화 불러오기에 실패하였습니다. 다시 시도해주세요.'});
		else res.send({ success: true, data: result});
		console.log(result);
		// data의 0번째는 movie 정보, 1:사진, 2: 비디오, 3:후기
	} catch(err) {
		next(err);
	}
	//return result;
}
module.exports = {
    createMovie: createMovie,
    getAllMovie: getAllMovie,
	getOneMovie: getOneMovie,
}