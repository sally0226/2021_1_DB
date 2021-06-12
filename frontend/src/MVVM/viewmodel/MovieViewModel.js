import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

import { API_URL } from '../../CommonVariable';

import { useMovieState, useMovieDispatch } from '../model/MovieModel';

const GetMovie = createContext(()=>{});

const MovieViewModel = ({children}) => {
	const movie = useMovieState();
	const setMovie = useMovieDispatch();

	useEffect(()=>{
		fetchMovie();
	},[]);

	const fetchMovie = () => {
		axios.get(`${API_URL}/movie`)
		.then(res => {
			//console.log(res.data);
			setMovie(res.data);
		})
	}

	return (
		<GetMovie.Provider value={fetchMovie}>
			{children}
		</GetMovie.Provider>
	)
}

export default MovieViewModel

export function useGetMovie() {
	const context = useContext(GetMovie);
	return context;
}