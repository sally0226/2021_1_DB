// const oracledb = require('oracledb');

// var config = {
// 	user: 'csuos',
// 	password: '0000',
// 	host: 'localhost',
// 	database: 'sidb',
// 	connectString: "localhost/XE"
// }

// function connectDB() {
// 	oracledb.getConnection(config, (err, conn) =>{
// 		if(err) console.log('접속실패', err);
// 		else console.log('성공');
	
// 		conn.execute("select * from movie", {}, {outFormat:oracledb.OBJECT}, function (err, result) {  
// 		// Json 형태로 넘어오도록 설정
// 		if(err) throw err; 
		
// 		console.log('query read success');
// 		console.log(result);
		
// 		dataStr = JSON.stringify(result);
// 		console.log(dataStr);
		
// 		arrStr = JSON.stringify(result.rows);
// 		var arr = JSON.parse(arrStr);
// 		console.log(arr);
		
// 		console.log(arr[0].MOVIE_NAME + " " + arr[0].SUMMARY);
		
// 		});
// 	});
// }

// module.exports = connectDB;
module.exports = {
	hrPool: {
	  user: "csuos",//process.env.HR_USER,
	  password: "0000",//process.env.HR_PASSWORD,
	  connectString: "localhost/XE",//process.env.HR_CONNECTIONSTRING,
	  poolMin: 10,
	  poolMax: 10,
	  poolIncrement: 0
	}
  };