import React, { useState, useEffect } from 'react'
import { Carousel, Header } from '../components';
import { Button, Grid } from '@material-ui/core';
import Slider from "react-slick";
import { useMovieState } from '../MVVM/model/MovieModel';

function Main() {
	const movie = useMovieState();
	let rank = 1;
	let len = movie.length;
	if(len>4) len =4;

	// <-- carousel setting
	const settings = {
		//infinite: true,
		speed: 500,
		slidesToShow: len,
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
							movie.SCRN_STATUS==="N" &&
							<div className="movies">
								<span className="rank">{rank++}</span>
								<div className="poster">
									<Grid className="movie-hover">
										<Button variant="outlined" href="/reserve" style={{marginBottom:'1rem'}}>예매하기</Button>
										<Button variant="outlined" href={`/movie/${movie.MOVIE_NUM}`}>상세정보</Button>
									</Grid>
								</div>
								<span>{movie.MOVIE_NAME}</span>
								<span>{movie.AVG_STARS===null ? 0 : movie.AVG_STARS}점</span>
							</div>
						))
					}
				</Slider>
			</Grid>
		</Grid>
	)
}

export default Main
