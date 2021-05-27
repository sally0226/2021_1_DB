import React, { useEffect } from 'react'

import { Carousel, Header } from '../components';
import { useMovieState } from '../MVVM/model/MovieModel'
import Slider from "react-slick";
import { Grid } from '@material-ui/core';

function NowScreen() {
	const movie = useMovieState();

	let rank = 1;

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
						movie.map((movie, i) => (
							movie.isScreen && 
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
