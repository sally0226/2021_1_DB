import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

import { API_URL } from '../../CommonVariable';

import { useMovieState, useMovieDispatch } from '../model/MovieModel';

const GetMovies = createContext(()=>{});

const MovieViewModel = ({id, children}) => {
	const movie = useMovieState();
	const setMovie = useMovieDispatch();

	useEffect(()=>{
		fetchMovies();
	},[]);

	const fetchMovies = async() => {
		await axios.get(`${API_URL}/movie`)
		.then(res => {
			setMovie(res.data);
		})
	}

	return (
		<GetMovies.Provider value={fetchMovies}>
			{children}
		</GetMovies.Provider>
	)
}

export default MovieViewModel

export function useGetMovies() {
	const context = useContext(GetMovies);
	return context;
}