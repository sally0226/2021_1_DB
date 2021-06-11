import React, { useState, useContext, createContext } from 'react';

const visitorState = createContext([]);
const visitorDispatch = createContext(()=>{});

function VisitorModel({ children }) {
	const initialState = [{
		id: 1,
		room: 2,
		name: '지의신',
		Date: new Date("2021-04-30"),
		number:'010-1111-1111'
	},{
		id: 2,
		room: 3,
		name: '김바다',
		Date: new Date("2021-05-30"),
		number:'010-1111-1111'
	},{
		id: 3,
		room: 4,
		name: '김수빈',
		Date: new Date("2021-06-05"),
		number:'010-1111-1111'
	},{
		id: 1,
		room: 2,
		name: '지의신',
		Date: new Date("2021-04-30"),
		number:'010-1111-1111'
	},{
		id: 2,
		room: 3,
		name: '김바다',
		Date: new Date("2021-05-30"),
		number:'010-1111-1111'
	},{
		id: 3,
		room: 4,
		name: '김수빈',
		Date: new Date("2021-06-05"),
		number:'010-1111-1111'
	},{
		id: 1,
		room: 2,
		name: '지의신',
		Date: new Date("2021-04-30"),
		number:'010-1111-1111'
	},{
		id: 2,
		room: 3,
		name: '김바다',
		Date: new Date("2021-05-30"),
		number:'010-1111-1111'
	},{
		id: 3,
		room: 4,
		name: '김수빈',
		Date: new Date("2021-06-05"),
		number:'010-1111-1111'
	},{
		id: 1,
		room: 2,
		name: '지의신',
		Date: new Date("2021-04-30"),
		number:'010-1111-1111'
	},{
		id: 2,
		room: 3,
		name: '김바다',
		Date: new Date("2021-05-30"),
		number:'010-1111-1111'
	},{
		id: 3,
		room: 4,
		name: '김수빈',
		Date: new Date("2021-06-05"),
		number:'010-1111-1111'
	}];
	const [visitorData, setVisitorData] = useState(initialState)
	// back에서 받아올때 예매율 순으로 받아오기
	return (
		<visitorState.Provider value={visitorData}>
			<visitorDispatch.Provider value={setVisitorData}>
				{children}
			</visitorDispatch.Provider>
		</visitorState.Provider>
	)
}

export default VisitorModel;

export function useVisitorState() {
	const context = useContext(visitorState);
	return context;
}