const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');


const signUp = async (req, res, next) => {
  try{
    const { name, phone, id, password, regnum, birth } = req.body;

	if (!id || !password)
		return res.status(200).json({ success: false, message: "아이디, 비밀번호를 제대로 입력해주세요" });
    
	/* 이미 유저가 있다면 가입 불가. */
    const foundUser = await userModel.findUser({ id, regnum });
    if (foundUser != 0)
		return res.status(200).json({ success: false, message: foundUser });
    
    const hashedPassword = await bcrypt.hash(password, 10);

	const userData = {
		name: name,
		phone: phone,
		id: id,
		password: hashedPassword, // hashedPassword로 바꿔서 보내기~
		regnum: regnum,
		birth: birth,
	};
    
	const result = await userModel.insertData(userData);
	if(result === "success")
		res.status(201).json({ success: true, userId: name});
	else if(result === 936 || result === 1840) {
		res.status(200).json({ success: false, message: '정보가 부족합니다.'});
	}
	else {
		res.status(200).json({ success: false, message: '회원가입에 실패하셨습니다.'})
	}
    
  } catch(err) {
    next(err)
  }
}

const logIn = async(req, res, next) => {
	try{
		const { id, password } = req.body;
		const loginData = await userModel.Login(id, password);
		if(loginData==0){ // 로그인실패
			return res.status(200).json({ success: false, message: '로그인에 실패하셨습니다.'})
		} else{
			bcrypt.compare(password, loginData[0].MEM_PW, function(err, isMatch){
				if(isMatch){
					return res.status(200).json({ success: true, user:loginData});
				}
				else return res.status(200).json({ success: false, message: '로그인에 실패하셨습니다.'})
			})
		}
	} catch(err) {
		next(err)
	}
}

module.exports ={
    signUp:signUp,
	logIn: logIn
}