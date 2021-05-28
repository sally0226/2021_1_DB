import React, { useState, useContext, createContext } from 'react';

const movieState = createContext([]);
const movieDispatch = createContext(()=>{});

function MovieModel({ children }) {
	const initialState = [{
		id: 1,
		name: "서복",
		reserveRate: 30,
		rate: 4.5,
		isScreen: true,
		Date: new Date("2021-04-30"),
	},{
		id: 2,
		name: "고질라 콩",
		reserveRate: 10,
		rate: 4,
		isScreen: true,
		Date: new Date("2021-04-30"),
	},{
		id: 3,
		name: "코난",
		reserveRate: 20,
		rate: 3,
		isScreen: false,
		Date: new Date("2021-04-30"),
	},{
		id: 4,
		name: "귀멸의 칼날",
		reserveRate: 25,
		rate: 5,
		isScreen: true,
		Date: new Date("2021-04-30"),
	},{
		id: 5,
		name: "임시영화1",
		reserveRate: 4,
		rate: 2,
		isScreen: false,
		Date: new Date("2021-04-30"),
	},{
		id: 6,
		name: "임시영화2",
		reserveRate: 2,
		rate: 2,
		isScreen: true,
		Date: new Date("2021-07-30"),
	},{
		id: 7,
		name: "임시영화3",
		reserveRate: 1.5,
		rate: 2,
		isScreen: false,
		Date: new Date("2021-04-30"),
	},{
		id: 8,
		name: "임시영화4",
		reserveRate: 1,
		rate: 2,
		isScreen: true,
		Date: new Date("2021-07-30"),
	},];
	const [movieData, setMovieData] = useState(initialState)
	// back에서 받아올때 예매율 순으로 받아오기
	return (
		<movieState.Provider value={movieData}>
			<movieDispatch.Provider value={setMovieData}>
				{children}
			</movieDispatch.Provider>
		</movieState.Provider>
	)
}

export default MovieModel;

export function useMovieState() {
	const context = useContext(movieState);
	return context;
}