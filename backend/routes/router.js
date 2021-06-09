const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', UserController.signUp) 
//router.use('/login', UserController.logIn)

module.exports = router;
