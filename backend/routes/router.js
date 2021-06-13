const express = require('express');
const UserController = require('../controllers/userController');
const MovieController = require('../controllers/movieController');
const DeptController = require('../controllers/deptController');
const EmpController = require('../controllers/empController');
const Scrn_roomController = require('../controllers/srcn_roomController');
const SchdeuleContruller = require('../controllers/scheduleController');
const scheduleController = require('../controllers/scheduleController');
const router = express.Router();


router.post('/signup', UserController.signUp);
router.post('/login', UserController.logIn);


router.get('/movie', MovieController.getAllMovie);
router.post('/movie', MovieController.createMovie);

router.get('/dept', DeptController.getAllDept);

router.post('/emp', EmpController.createEmp);
router.get('/emp', EmpController.getAllEmp);

router.get('/room', Scrn_roomController.getAllRoom);

router.post('/schedule', SchdeuleContruller.createSchedule);
router.get('/schedule', scheduleController.getAllSchedule);
router.put('/schedule/:sche_num', scheduleController.updateSchedule);
router.delete('/schedule/:sche_num', scheduleController.deleteSchedule);

module.exports = router;
