import axios from 'axios';
import React, { useState, useContext, createContext, useEffect } from 'react';
import { API_URL } from '../../CommonVariable';

const visitorState = createContext([]);
const visitorDispatch = createContext(()=>{});

function VisitorModel({ children }) {
	const [visitorData, setVisitorData] = useState([])
	useEffect(() => {
		async function getdata() {
			await axios.get(`${API_URL}/enter`)
			.then(r => setVisitorData(r.data))
		}
		getdata();
	}, [])
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