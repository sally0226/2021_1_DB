import React from 'react';

import { Grid } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

import { Header, RatingCircle } from '../components';
import { useMovieState } from '../MVVM/model/MovieModel';

function MovieDetail(props) {
	const movieId = props.match.params.movieId
	const movieData = useMovieState();
	const movie = movieData[movieId-1];
	return (
		<Grid className="movieDetail">
			<Header />
			<Grid className="detail-body">
				<p className="head-typo">영화 상세</p>
				<Grid className="movie">
					<div style={{
						width: '150px',
						height: '200px',
						backgroundColor: 'white'
					}} />
					<Grid className="movie-right">
						<Grid className="movie-header">
							<Grid className="circle">
								<RatingCircle rating="전체이용가" />
							</Grid>
							<p>{movie.name}</p>
							<Grid className="tag">{movie.isScreen ? "현재 상영중" : null}</Grid>
						</Grid>
						<Grid className="movie-middle">
							<Grid className="review">
								<p>관람객평점</p>
								<p style={{fontSize:'1.3rem', fontWeight:'bold', margin: '0 0.3rem 0 1rem'}}>8.3</p>
								<StarIcon style={{color:'yellow'}} />
							</Grid>
						</Grid>

					</Grid>
				</Grid>
				<Grid>
					Tab
				</Grid>
			</Grid>
		</Grid>
	)
}

export default MovieDetail
