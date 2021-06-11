const express = require('express');
const app = express();

const cors = require('cors');
const router = require('./routes/router');
const dbConfig = require('./config/dbConfig');
const initDB = require('./initDB');

const port = 5000;
const defaultThreadPoolSize = 4;
process.env.THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;

// DB init
initDB.init();

app.use(cors());
app.use(express.json());
app.use('/api',router);
app.listen(port, () => console.log(`app listening on port ${port}!`));
