const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const router = require('./routes/router');
const connOracleDB = require('./config/connOracleDB');

app.use(cors());
app.use(express.json());
app.use('/',router);
app.listen(port, () => console.log(`app listening on port ${port}!`))


