const express = require('express');
const router = express.Router();
import UserRouter from './UserRouter';

router.use('/api/user', UserRouter);

module.exports = router;
