const bcrypt = require('bcrypt');
const errorGenerator = require('../function/errorGenerator');
const  userModel = require('../models/userModel');


const signUp = async (req, res, next) => {
  try{
    const { name, phone, id, password, regnum, birth } = req.body;

	// 입력사항을 입력하지 않으면 에러.
    if (!id || !password) errorGenerator.errorGenerator({ message: 'invalid input', statusCode: 400});
	/*
	위 코드는 이것과 같은 말.
	if (!id || !password) {
      const err = new Error('invalid input')
      err.statusCode = 400
      throw err
    } catch(err) {
      res.status(400).json({ message: err.message })
    }
	*/
    
	/* 이미 유저가 있다면 가입 불가. */
    const foundUser = await userModel.findUser({ id }) ;
    if (foundUser) error.errorGenerator({ statusCode: 409 });
    
    const hashedPassword = await bcrypt.hash(password, 10);

	const userData = {
		name: name,
		phone: phone,
		id: id,
		password: password, // hashedPassword로 바꿔서 보내기~
		regnum: regnum,
		birth: birth,
	};
    
	const result = await userModel.insertData(userData);
	if(result === "success")
		res.status(201).json({ message: 'success', userId: password});
	else errorGenerator.errorGenerator({ message: result, statusCode: 500 });
    
  } catch(err) {
    next(err)
  }
}


module.exports ={
    signUp:signUp,
}