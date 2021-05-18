import React, { useState } from 'react'
import { Header } from '../components';
import { Grid } from '@material-ui/core';

function Main() {
	const [movie, setMovie] = useState([1,2,3,4,5]);
	return (
		<Grid className="main">
			<Header />
			<Grid className="main-content">
				<Grid className="slider">
					영화 슬라이더 넣는 자리
				</Grid>
				<Grid className="movie-list">
					{
						movie.map((movie, i) => (
							<Grid className="movies">
								<span className="rank">{i}</span>
								<span>영화사진</span>
							</Grid>
						))
					}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Main
