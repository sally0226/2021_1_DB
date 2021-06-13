import React, { useState, useContext, createContext } from 'react';

const movieState = createContext([]);
const movieDispatch = createContext(()=>{});

function MovieModel({ children }) {
	const [movieData, setMovieData] = useState([])
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
export function useMovieDispatch() {
	const context = useContext(movieDispatch);
	return context;
}