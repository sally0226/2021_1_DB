const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/test', testController.insertItem); // localhost:5000/test 요청이 오면, testController의 insertItem 함수를 실행한다 
module.exports = router;