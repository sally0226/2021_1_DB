import React, { useEffect } from 'react'

import { Header } from '../components';
import { useMovieState } from '../MVVM/model/MovieModel'
import Slider from "react-slick";
import { Grid, Button } from '@material-ui/core';

function NowScreen({ match }) {
	const { status } = match.params; // now, will
	const movie = useMovieState();
	console.log(movie);
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
							// todo: 상영중인 영화만 불러오도록 아래 주석 지우기
							//movie.SCRN_STATUS==="Y" &&
							new Date(movie.RELEASE_DATE) <= today &&
							<div className="movies">
								<span className="rank">{rank++}</span>
								<div className="poster">
									<Grid className="movie-hover">
										<Button variant="outlined" href="/reserve" style={{marginBottom:'1rem'}}>예매하기</Button>
										<Button variant="outlined" href={`/movie/${movie.MOVIE_NUM}`}>상세정보</Button>
									</Grid>
									<img alt="포스터" style={{width: '100%', height:'100%'}} src={movie.POSTER} />
								</div>
								<span>{movie.MOVIE_NAME}</span>
								<span>{movie.AVG_STARS === null ? 0 : movie.AVG_STARS}점</span>
							</div>
						))
						: movie.map((movie, i) => (
							new Date(movie.RELEASE_DATE) > today &&
							<div className="movies">
								<span className="rank">{rank++}</span>
								<div className="poster">
									<Grid className="movie-hover">
										<Button variant="outlined" href="/reserve" style={{marginBottom:'1rem'}}>예매하기</Button>
										<Button variant="outlined" href={`/movie/${movie.MOVIE_NUM}`}>상세정보</Button>
									</Grid>
									<img alt="포스터" style={{width: '100%', height:'100%'}} src={movie.POSTER} />
								</div>
								<span>{movie.MOVIE_NAME}</span>
							</div>
						))
					}
				</Slider>
			</Grid>
		</Grid>
	)
}

export default NowScreen
