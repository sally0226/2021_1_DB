const conn = require('./models/database');
const database = require('./models/database');

/* DB OPEN */
async function initDB()  {
	try {
		console.log('Initializing database module');
		await database.initialize();
	} catch (err) {
		console.error(err);
		process.exit(1); // Non-zero failure code
	}
}

/* DB CLOSE */
async function close() {
	try {
		console.log('Closing database module');
	  
		await database.close(); 
	} catch (err) {
		console.log('Encountered error', e);
	  
		err = err || e;
	}
}

module.exports = {
    init : initDB
}