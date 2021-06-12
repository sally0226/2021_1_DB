const express = require('express');
const UserController = require('../controllers/userController');
const MovieController = require('../controllers/movieController');
const DeptController = require('../controllers/deptController');
const EmpController = require('../controllers/empController');
const router = express.Router();


router.post('/signup', UserController.signUp);
router.post('/login', UserController.logIn);


router.get('/movie', MovieController.getAllMovie);
router.post('/movie', MovieController.createMovie);

router.get('/dept', DeptController.getAllDept);

router.post('/emp', EmpController.createEmp);

module.exports = router;
