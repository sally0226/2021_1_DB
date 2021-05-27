import React from 'react';
import Provider from './MVVM/Provider';

function App() {
	// Provider에서 model과 viewmodel로 감싸진 router를 내보냅니다.
  	return <Provider />
}

export default App;
