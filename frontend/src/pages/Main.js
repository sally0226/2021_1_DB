import React, { useState, useEffect } from 'react'
import { Carousel, Header } from '../components';
import { Grid } from '@material-ui/core';
import Slider from "react-slick";

function Main() {
	const [movie, setMovie] = useState([{
			id: 1,
			name: "서복",
			reserveRate: 30,
			rate: 4.5
		},{
			id: 2,
			name: "고질라 콩",
			reserveRate: 10,
			rate: 4
		},{
			id: 3,
			name: "코난",
			reserveRate: 20,
			rate: 3
		},{
			id: 4,
			name: "귀멸의 칼날",
			reserveRate: 25,
			rate: 5
		},{
			id: 5,
			name: "임시영화1",
			reserveRate: 4,
			rate: 2
		},{
			id: 6,
			name: "임시영화2",
			reserveRate: 2,
			rate: 2
		},{
			id: 7,
			name: "임시영화3",
			reserveRate: 1.5,
			rate: 2
		},{
			id: 8,
			name: "임시영화4",
			reserveRate: 1,
			rate: 2
		},{
			id: 9,
			name: "임시영화5",
			reserveRate: 1,
			rate: 2
		}
	]);
	useEffect(() => {
		movie.sort(function(a,b) {
			if(a.reserveRate > b.reserveRate) return -1;
			if(a.reserveRate===b.reserveRate) return 0;
			else return 1;
		})
		console.log(movie);
	}, [])

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		className: "movie-list",
		appendDots: dots=>(<span />)
	};
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
							<div className="movies">
								<span className="rank">{i + 1}</span>
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

export default Main
