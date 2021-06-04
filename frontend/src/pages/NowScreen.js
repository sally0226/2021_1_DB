import React, { useEffect } from 'react'

import { Header } from '../components';
import { useMovieState } from '../MVVM/model/MovieModel'
import Slider from "react-slick";
import { Grid, Button } from '@material-ui/core';

function NowScreen({ match }) {
	const { status } = match.params; // now, will
	const movie = useMovieState();
	let rank = 1;
	let today = new Date();

	// <-- carousel setting
	const settings = {
		className: "slider",
		speed: 500,
		rows: 2,
		slidesPerRow: 4
	};
	// carousel setting -->
	
	return (
		<Grid className="nowscreen">
			<Header />
			<Grid className="main-content">
				<Slider {...settings}>
					{
						status === "now" ?
						movie.map((movie, i) => (
							movie.isScreen &&
							movie.Date <= today &&
							<div className="movies">
								<span className="rank">{rank++}</span>
								<div className="poster">
									<Grid className="movie-hover">
										<Button variant="outlined" href="/reserve" style={{marginBottom:'1rem'}}>예매하기</Button>
										<Button variant="outlined" href={`/movie/${movie.id}`}>상세정보</Button>
									</Grid>
								</div>
								<span>{movie.name}</span>
								<span>{movie.rate}점</span>
							</div>
						))
						: movie.map((movie, i) => (
							movie.isScreen && 
							movie.Date > today &&
							<div className="movies">
								<span className="rank">{rank++}</span>
								<span>영화사진</span>
								<span>{movie.name}</span>
								<span>{movie.rate}점</span>
							</div>
						))
					}
				</Slider>
			</Grid>
		</Grid>
	)
}

export default NowScreen
