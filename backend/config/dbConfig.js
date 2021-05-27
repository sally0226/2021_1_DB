// db연결할 때, 설정할 config 정보를 담고있는 file
module.exports = {
	hrPool: {
	  user: "csuos",//process.env.HR_USER,
	  password: "0000",//process.env.HR_PASSWORD,
	  connectString: "localhost/XE",//process.env.HR_CONNECTIONSTRING,
	  // 아래 pool관련 속성들에 대해선 아직 저도 잘 모릅니다!
	  poolMin: 10,
	  poolMax: 10,
	  poolIncrement: 0,
	}
  };