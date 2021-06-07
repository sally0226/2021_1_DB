import { Request, Response, NextFunction } from 'express';
//import { errorGenerator } from '../errors';
import bcrypt from 'bcryptjs' ;
import { UserService } from '../Services';

const signUp = async (req, res, next) => {
  try{
    const { id, password } = req.body;
    //if (!email || !password) errorGenerator({ message: 'invalid input', statusCode: 400})

    // if (!email || !password) {
    //   const err = new Error('invalid input')
    //   err.statusCode = 400
    //   throw err
    // } catch(err) {
    //   res.status(400).json({ message: err.message })
    // }       
    
    const foundUser = await UserService.findUser({ email }) 
    if (foundUser) errorGenerator({ statusCode: 409 })
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const createdUser = await UserService.createUser({ email, password: hashedPassword})
    
    res.status(201).json({ message: 'created', createdUserEmail: createdUser.email })
    
  } catch(err) {
    next(err)
  }
}

// UserController에서 구현한 함수가 객체에 맵핑됨
export {
  signUp,
  logIn
}