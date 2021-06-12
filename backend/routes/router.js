const express = require('express');
const UserController = require('../controllers/userController');
const MovieController = require('../controllers/movieController');
const router = express.Router();


router.post('/signup', UserController.signUp);
router.post('/login', UserController.logIn);


router.get('/movie', MovieController.getAllMovie);
router.post('/movie', MovieController.createMovie);


module.exports = router;
