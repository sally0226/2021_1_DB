import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios'

import { Button, Grid, InputBase, Tab, Tabs } from '@material-ui/core';
import { ReactComponent as Star } from '../assets/Star.svg'

import { Header, RatingCircle } from '../components';
import { useMovieState } from '../MVVM/model/MovieModel';
import { API_URL } from '../CommonVariable';

function dataReducer(state, action) {
    switch (action.type) {
        case 'SET':
            return action.data;
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function MovieDetail(props) {
	const movieId = props.match.params.movieId

	//const [movie, setMovie] = useState();
	const [movie, movieDispatch] = useReducer(dataReducer, []);


	useEffect(() => {
		const getData = async() => {
			await axios.get(`${API_URL}/movie/${movieId}`)
			.then(result => {
				console.log(result.data.data);
				movieDispatch({
					type: 'SET',
					data: result.data.data
				})
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
							<Grid className="tag">{movie && movie[0].SCRN_STATUS ==='Y' ? "현재 상영중" : null}</Grid>
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
							<p>감독 : {movie && movie[0].DIRECTORE} / 배우 : {movie && movie[0].CAST}</p>
							<p>장르 : {movie && movie[0].GENRE}</p>
							<p>개봉 : {movie && movie[0].RELEASE_DATE}</p>
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
							<p>시놉시스 내용</p>
							<p className="body-head">트레일러</p>
							<span>트레일러 영상</span>
							<p className="body-head">포스터 & 스틸컷</p>
							<div style={{
								width: '150px',
								height: '200px',
								backgroundColor: 'white'
							}} />
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
								<p>총 ?건</p>
								<Grid className="list-con">
									<Grid className="comment-box">
										comment 디비에서 들고오면 담아주기
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
