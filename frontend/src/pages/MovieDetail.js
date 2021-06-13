import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { Button, Grid, InputBase, Tab, Tabs } from '@material-ui/core';
import { ReactComponent as Star } from '../assets/Star.svg'

import { Header, RatingCircle } from '../components';
import { API_URL } from '../CommonVariable';

const starScore = (num) => {
	// todo: 반복문으로 코드 줄이기 ;
	if(num===0)
		return (
			<Grid className="starScore-con">
				<Star fill="gray" width="20" height="20" />
				<Star fill="gray" width="20" height="20" />
				<Star fill="gray" width="20" height="20" />
				<Star fill="gray" width="20" height="20" />
				<Star fill="gray" width="20" height="20" />
			</Grid>
		)
	else if(num===1)
		return (
			<Grid className="starScore-con">
				<Star fill="yellow" width="20" height="20" />
				<Star fill="gray" width="20" height="20" />
				<Star fill="gray" width="20" height="20" />
				<Star fill="gray" width="20" height="20" />
				<Star fill="gray" width="20" height="20" />
			</Grid>
		)
	else if(num===2)
		return (
		<Grid className="starScore-con">
			<Star fill="yellow" width="20" height="20" />
			<Star fill="yellow" width="20" height="20" />
			<Star fill="gray" width="20" height="20" />
			<Star fill="gray" width="20" height="20" />
			<Star fill="gray" width="20" height="20" />
		</Grid>
		)
	else if(num===3)
		return (
		<Grid className="starScore-con">
			<Star fill="yellow" width="20" height="20" />
			<Star fill="yellow" width="20" height="20" />
			<Star fill="yellow" width="20" height="20" />
			<Star fill="gray" width="20" height="20" />
			<Star fill="gray" width="20" height="20" />
		</Grid>
		)
	else if(num===4)
	return (
	<Grid className="starScore-con">
		<Star fill="yellow" width="20" height="20" />
		<Star fill="yellow" width="20" height="20" />
		<Star fill="yellow" width="20" height="20" />
		<Star fill="yellow" width="20" height="20" />
		<Star fill="gray" width="20" height="20" />
	</Grid>
	)
	else return (
		<Grid className="starScore-con">
		<Star fill="yellow" width="20" height="20" />
		<Star fill="yellow" width="20" height="20" />
		<Star fill="yellow" width="20" height="20" />
		<Star fill="yellow" width="20" height="20" />
		<Star fill="yellow" width="20" height="20" />
		</Grid>
	)
}

function MovieDetail(props) {
	const movieId = props.match.params.movieId
	const [movie, setMovie] = useState()

	useEffect(() => {
		const getData = async() => {
			await axios.get(`${API_URL}/movie/${movieId}`)
			.then(result => {
				console.log(result.data.data);
				setMovie(result.data.data);
			})
		}
		getData()
	}, [])
	console.log(movie);

	// <-- Tab
	const [tabValue, setTabValue] = useState(0);
	const tabChangeHandler = (e, newValue) => {
		setTabValue(newValue);
	}
	// Tab -->

	// <-- star
	const [clicked, setClicked] = useState([true,true,true,true,true]);
	const [score, setScore] = useState(5);
	const starClickHandler = (e, index) => {
		e.preventDefault();
		let clickStates = [...clicked];
		for(let i=0; i<5; i++){
			if(i <= index) clickStates[i] = true;
			else clickStates[i] = false;
		}
		setScore(index+1);
		setClicked(clickStates);
	}
	// star -->

	const [comment, setComment] = useState();

	const submitHandler = (e) => {
		e.preventDefault();
		if(comment===undefined || comment === "")
		alert('comment를 입력해주세요');
		else alert('comment: ' + comment);
	}

	return (
		<Grid className="movieDetail">
			<Header />
			<Grid className="detail-body">
				<p className="head-typo">영화 상세</p>
				<Grid className="movie">
					{/* todo: 포스터 받아오면 포스터 넣기 */}
					<div style={{
						minWidth: '150px',
						height: '200px',
						backgroundColor: 'white'
					}} />
					<Grid className="movie-right">
						<Grid className="movie-header">
							<Grid className="circle">
								<RatingCircle rating="전체이용가" />
								{/* todo: codedata 바뀌면 rating 적용하기!  */}
							</Grid>
							<p>{movie && movie[0].MOVIE_NAME}</p>
							{movie && movie[0].SCRN_STATUS ==='Y' ? <Grid className="tag">"현재 상영중"</Grid> : null}
						</Grid>
						<Grid className="movie-middle">
							<Grid className="review">
								<p>관람객평점</p>
								<p style={{fontSize:'1.3rem', fontWeight:'bold', margin: '0 0.3rem 0 1rem'}}>{movie&& (movie[0].AVG_STARS === null? 0:movie[0].AVG_STARS)}</p>
								<Star fill="yellow" width="25" height="25" />
							</Grid>
							<Button
								href="/reserve"
								variant="contained"
								style={{ backgroundColor:'#B48484', color:'#ffffff', fontWeight:'bold'}}
							>예매하기</Button>
						</Grid>
						<Grid className="movie-last">
							<p>감독 : {movie && movie[0].DIRECTOR} / 배우 : {movie && movie[0].CAST}</p>
							<p>장르 : {movie && movie[0].GENRE}</p>
							<p>개봉 : {movie && movie[0].RELEASE_DATE.substring(0,10)}</p>
						</Grid>
					</Grid>
				</Grid>
				<Grid>
					<Tabs
						value={tabValue}
						onChange={tabChangeHandler} variant="fullWidth"
						style={{ margin: '1.5rem 0'}}
					>
						<Tab label="영화 정보" className="tabLabel" />
						<Tab label="평점 및 관람평" className="tabLabel" />
					</Tabs>
					{
						tabValue === 0? // 영화 정보
						<Grid className="tab-content">
							<p className="body-head">시놉시스</p>
							<p>{movie && movie[0].MOVIE_INTRO}</p>
							<p className="body-head">트레일러</p>
							<Grid className="media-con">
								{movie && movie[2].map(vid => (
									<iframe width="400" height="250" allowfullscreen src={vid.TRAILER_VIDEO_ROUTE} title="YouTube video player" frameborder="0" allow="accelerometer"></iframe>
								))}
							</Grid>
							<p className="body-head">포스터 & 스틸컷</p>
							<Grid>
								{/* todo : 사진 잘 보이게 하기 */}
								{movie && movie[1].map(shot => (
									shot.TRAILER_SHOT_ROUTE
								))}
							</Grid>
						</Grid>
						: // 평점 및 관람평
						<Grid className="tab-content">
							<Grid className="comment">
								<Grid item xs={3} className="star-grid">
									<p>{score}점</p>
									<Grid className="star-con">
										<span className="star-clicker">
										<Star width="25" height="25" fill={clicked[0] ? 'yellow' : 'gray'} onClick={e => starClickHandler(e,0)} />
										<Star width="25" height="25" fill={clicked[1] ? 'yellow' : 'gray'} onClick={e => starClickHandler(e,1)} />
										<Star width="25" height="25" fill={clicked[2] ? 'yellow' : 'gray'} onClick={e => starClickHandler(e,2)} />
										<Star width="25" height="25" fill={clicked[3] ? 'yellow' : 'gray'} onClick={e => starClickHandler(e,3)} />
										<Star width="25" height="25" fill={clicked[4] ? 'yellow' : 'gray'} onClick={e => starClickHandler(e,4)} />
										</span>
									</Grid>
								</Grid>
								<Grid item xs={6} className="comment-body">
									<InputBase 
										placeholder="관람평을 작성해주세요(최대 200자)"
										fullWidth
										multiline
										required
										value={comment}
										onChange={(e)=>setComment(e.target.value)}
										rows={5}
										inputProps={{maxLength:200}}
									/>
								</Grid>
								<Grid item xs={3} className="comment-submit">
									<Button
										color="inherit"
										style={{width:'100%', height:'100%'}}
										onClick={submitHandler}
									>
										등록
									</Button>
								</Grid>
							</Grid>
							<Grid className="comment-list">
								<p>총 {movie[3].length}건</p>
								<Grid className="list-con">
									{
										movie && movie[3].map(review => (
											<Grid className="comment-box">
												{review.STARS}
												{review.COMMENT}
											</Grid>
										))
									}
									{/* review 연결하면 아래 예시 지우기 */}
									<Grid className="comment-box">
										{starScore(3)}
										안녕
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default MovieDetail
