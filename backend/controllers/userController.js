const bcrypt = require('bcrypt');
const errorGenerator = require('../function/errorGeneratior');
const  userModel = require('../models/userModel');

const signUp = async (req, res, next) => {
  try{
    const { name, phone, id, password, regnum } = req.body;
	// 입력사항을 입력하지 않으면 에러.
    if (!id || !password) errorGenerator({ message: 'invalid input', statusCode: 400});
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
    if (foundUser) errorGenerator({ statusCode: 409 });
    
    const hashedPassword = await bcrypt.hash(password, 10);

	const userData = {
		name: name,
		phone: phone,
		id: id,
		password: password,
		regnum: regnum
	}
    
	userModel.insertData(userData, (result)=>{
		if(result) console.log(result);
	})

    res.status(201).json({ message: 'created', createdUserEmail: createdUser.email });
    
  } catch(err) {
    next(err)
  }
}


module.exports ={
    signUp:signUp,
}