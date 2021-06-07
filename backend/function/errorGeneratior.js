const DEFAULT_HTTP_STATUS_MESSAGES = {
	400: 'Bad Requests',
	401: 'Unauthorized',
	403: 'Foribdden',
	404: 'Not Found',
	409: 'duplicate',
	500: 'Internal Server Error',
	503: 'Temporary Unavailable',
   }
 
   // 1. 에러를 만들고 2. statusCode 저장 3. error throw
   const errorGenerator = ({ message = '', statusCode = 500 }) => {
	/* 우리가 만드는 에러는 statusCode가 함께 있는 에러이다(err: ErrorWithStatusCode)
	인자로 들어오는 message와 statusCode mapping */
	const err = new Error(message || DEFAULT_HTTP_STATUS_MESSAGES[statusCode])
	err.statusCode = statusCode   
	throw err
   }
   
   export default errorGenerator