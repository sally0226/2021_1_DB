import React, { useEffect, useContext, createContext } from 'react';
import axios from 'axios';

import { API_URL } from '../../CommonVariable';

import { useMovieRatingDispatch, useMovieRatingState } from '../model/CodeModel';

const GetMovieRating = createContext(()=>{});

const CodeViewModel = ({id, children}) => {
	const movieRating = useMovieRatingState();
	const movieRatingDispatch = useMovieRatingDispatch();

	useEffect(()=>{
		fetchMovieRating();
	},[]);

	const fetchMovieRating = async() => {
		var data;
		await axios.get(`${API_URL}/movierate`)
		.then(res => {
			data = res.data;
			data.shift();
			movieRatingDispatch(data);
		})
	}

	return (
		<GetMovieRating.Provider value={fetchMovieRating}>
			{children}
		</GetMovieRating.Provider>
	)
}

export default CodeViewModel

export function useGetMovieRating() {
	const context = useContext(GetMovieRating);
	return context;
}