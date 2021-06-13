const express = require('express');
const UserController = require('../controllers/userController');
const MovieController = require('../controllers/movieController');
const DeptController = require('../controllers/deptController');
const EmpController = require('../controllers/empController');
const Scrn_roomController = require('../controllers/srcn_roomController');
const SchdeuleContruller = require('../controllers/scheduleController');
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

router.get('/room', Scrn_roomController.getAllRoom);
router.post('/room', Scrn_roomController.createRoom);
router.delete('/room/:room_num', Scrn_roomController.deleteRoom);

router.post('/schedule', SchdeuleContruller.createSchedule);
router.get('/schedule', SchdeuleContruller.getAllSchedule);
router.put('/schedule/:sche_num', SchdeuleContruller.updateSchedule);
router.delete('/schedule/:sche_num', SchdeuleContruller.deleteSchedule);

router.get('/codes/emc_exit',codeController.getEmc_ExitCode);

module.exports = router;
