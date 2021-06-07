import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ErrorWithStatusCode } from './errorGenerator';

const generalErrorHandler = (err, req, res, next) => {
  const { message, statusCode } = err;
  // 에러 발생 시 err 객체를 만들때 받은 message와 statusCode를 구조분해 할당으로 가져옴 

  console.error(err);
  res.status(statusCode || 500).json({ message });
  // statusCode와 message를 mapping해서 응답, response에 json method를 확인하여 보내줌  
}

export default generalErrorHandler