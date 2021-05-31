import React, { useState, useEffect } from 'react'
import { Carousel, Header } from '../components';
import { Grid } from '@material-ui/core';
import Slider from "react-slick";
import { useMovieState } from '../MVVM/model/MovieModel';

function Main() {
	const movie = useMovieState();
	let rank = 1;

	// <-- carousel setting
	const settings = {
		//infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		className: "movie-list",
	};
	// carousel setting -->

	return (
		<Grid className="main">
			<Header />
			<Grid className="main-content">
				<Grid className="slider">
					<Carousel />
				</Grid>
				<Slider {...settings}>
					{
						movie.map((movie, i) => (
							movie.isScreen &&
							<div className="movies">
								<span className="rank">{rank++}</span>
								<div style={{
									width: '150px',
									height: '200px',
									backgroundColor: 'white'
								}} />
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

export default Main
