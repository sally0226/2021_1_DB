import { Router } from 'express'
/* '../controllers/index.ts'의 UserController 객체에서 바로 구조분해 할당한 것
(객체에서 필요한 key value를 꺼내오듯이 모듈도 객체에서 꺼내올 수 있다) */
import { UserController } from '../controllers'  


const router = Router()

// '/signup', '/login'이면 UserController에 signUp/logIn 함수로 엔드포인트에 맵핑 
router.use('/signup', UserController.signUp) 
router.use('/login', UserController.logIn)

export default router