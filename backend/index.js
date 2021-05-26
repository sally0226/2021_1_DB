const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const router = require('./routes/router');
const dbConfig = require('./config/dbConfig');
const database = require('./models/database.js');
const defaultThreadPoolSize = 4;

process.env.THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;
const dbSetting = require('./dbSetting').createTestTable;
// DB init
async function initDB(){
  try {
    console.log('Initializing database module');

    await database.initialize(); 
  } catch (err) {
    console.error(err);

    process.exit(1); // Non-zero failure code
  }
  dbSetting();
}

// // DB close
// try {
//     console.log('Closing database module');
  
//     await database.close(); 
//   } catch (err) {
//     console.log('Encountered error', e);
  
//     err = err || e;
//   }
initDB();

app.use(cors());
app.use(express.json());
app.use('/',router);
app.listen(port, () => console.log(`app listening on port ${port}!`))