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
		password: hashedPassword,
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

const enter = async(req, res, next) => {
	try{
		const { name, contact, room } = req.body;
		const result = await userModel.Enter(name,contact,room);
		if(result===0){ // 입장 실패
			return res.status(200).json({ success: false, message: '작성에 실패햐였습니다.'})
		} else return res.status(200).json({ success: true, message: '즐거운 관람되십시오.'})
	} catch(err) {
		next(err)
	}
}

const getEnter = async(req, res, next) => {
	try{
		const result = await userModel.GetEnter();
		console.log(result);
		if(result===0) // 실패
			return res.status(200).json({ success: false, message: '데이터를 불러오는 데 실패하였습니다.'})
		else return res.status(200).json(result.rows);
	} catch(err){
		next(err);
	}
}

module.exports ={
    signUp:signUp,
	logIn: logIn,
	enter: enter,
	getEnter: getEnter,
}