const bcrypt = require('bcrypt');
const movieModel = require('../models/movieModel');
const userModel = require('../models/movieModel');
const { get } = require('../routes/router');

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
    try {
        const result = await movieModel.selectAllMovie();
        res.body(result)
    } catch(err) {
        next(err);
    }
    return result;
}
module.exports = {
    createMovie: createMovie,
    getAllMovie: getAllMovie,
}