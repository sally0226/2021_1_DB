const express = require('express');
const UserController = require('../controllers/userController');
const MovieController = require('../controllers/movieController');
const DeptController = require('../controllers/deptController');
const EmpController = require('../controllers/empController');
const Scrn_roomController = require('../controllers/srcn_roomController');
const codeController = require('../controllers/codeController');
const reviewController = require('../controllers/reviewController');
const scheduleController = require('../controllers/scheduleController');
const router = express.Router();


router.post('/signup', UserController.signUp);
router.post('/login', UserController.logIn);
router.post('/enter', UserController.enter);
router.get('/enter', UserController.getEnter);

router.get('/movie', MovieController.getAllMovie);
router.get('/movie/:id', MovieController.getOneMovie);
router.post('/movie', MovieController.createMovie);
router.delete('/movie/:movie_num', MovieController.deleteMovie);
router.put('/movie/:movie_num', MovieController.updateMovie);
router.get('/movierate', codeController.getMovieRatingCode);

router.post('/review', reviewController.createReview);
router.get('/review/:movie_num', reviewController.getReview);
router.delete('/review/:review_num', reviewController.deletetReview);
router.patch('/review', reviewController.updateReview);

router.get('/dept', DeptController.getAllDept);

router.post('/emp', EmpController.createEmp);
router.get('/emp', EmpController.getAllEmp);

router.get('/room', Scrn_roomController.getAllRoom);
router.post('/room', Scrn_roomController.createRoom);
router.delete('/room/:room_num', Scrn_roomController.deleteRoom);
router.get('/roomid', Scrn_roomController.getAllRoomId)

router.post('/schedule', scheduleController.createSchedule);
router.get('/schedule', scheduleController.getAllSchedule);
router.get('/scheduledetail', scheduleController.getAllDetailSchedule);
router.put('/schedule/:sche_num', scheduleController.updateSchedule);
router.delete('/schedule/:sche_num', scheduleController.deleteSchedule);

router.get('/codes/emc_exit',codeController.getEmc_ExitCode);

module.exports = router;
