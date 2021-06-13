import React, { useState, useContext, createContext } from 'react';

const movieRatingState = createContext([]);
const movieRatingDispatch = createContext(()=>{});

function CodeModel({ children }) {
	const [movieRatingData, setMovieRatingData] = useState([])

	return (
		<movieRatingState.Provider value={movieRatingData}>
			<movieRatingDispatch.Provider value={setMovieRatingData}>
				{children}
			</movieRatingDispatch.Provider>
		</movieRatingState.Provider>
	)
}

export default CodeModel;

export function useMovieRatingState() {
	const context = useContext(movieRatingState);
	return context;
}
export function useMovieRatingDispatch() {
	const context = useContext(movieRatingDispatch);
	return context;
}