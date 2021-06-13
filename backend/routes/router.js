const express = require('express');
const UserController = require('../controllers/userController');
const MovieController = require('../controllers/movieController');
const DeptController = require('../controllers/deptController');
const EmpController = require('../controllers/empController');
const codeController = require('../controllers/codeController');
const router = express.Router();


router.post('/signup', UserController.signUp);
router.post('/login', UserController.logIn);


router.get('/movie', MovieController.getAllMovie);
router.get('/movie/:id', MovieController.getOneMovie);
router.post('/movie', MovieController.createMovie);
router.delete('/movie/:movie_num', MovieController.deleteMovie);
router.put('/movie/:movie_num', MovieController.updateMovie);
router.get('/movierate', codeController.getMovieRatingCode);

router.get('/dept', DeptController.getAllDept);

router.post('/emp', EmpController.createEmp);
router.get('/emp', EmpController.getAllEmp);

module.exports = router;
