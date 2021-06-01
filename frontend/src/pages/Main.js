import React, { useState, useEffect } from 'react'
import { Carousel, Header } from '../components';
import { Button, Grid } from '@material-ui/core';
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
					}
				</Slider>
			</Grid>
		</Grid>
	)
}

export default Main
