import React, { useState } from 'react'

import { Grid, Button, FilledInput, FormControl, FormHelperText, InputAdornment, Link } from '@material-ui/core';
import BeenhereIcon from '@material-ui/icons/Beenhere';

import { DotStepper, Header, StepFirst, StepSecond, StepZero } from '../components'
import { useMovieState } from '../MVVM/model/MovieModel';

function Reserve() {
	const steps = 4; // 예약 step 개수
	const [step, setStep] = useState(0);
	const title = ["상영시간", "인원좌석", "  결제  ", "결제완료"];

	const stepNextHandler = () => {
		if(step < 3)
			setStep(step+1);
	};
	const stepPrevHandler = () => {
		if(step > 0)
			setStep(step-1);
	};

	//<-- 영화 정보
	const movie = useMovieState();
	const [movieId, setMovieId] = useState(0);
	// 영화 정보 -->

	//<-- 상영일정 정보 ( stepZero 에서 setSchData 함. )
	const [schData, setSchData] = useState();
	// 상영일정 정보 -->
	
	return (
		<Grid className="reserve">
			<Header />
			<DotStepper steps={steps} step={step} title={title} />
			<Grid className="step-grid">
				{
					step===0 ?
					<StepZero next={stepNextHandler} selectMovie={setMovieId} selectSch={setSchData} data={movie}/>
					: step === 1 ?
					<StepFirst next={stepNextHandler} prev={stepPrevHandler} />
					: step === 2 ?
					<StepSecond
						next={stepNextHandler} prev={stepPrevHandler}
						movie={movie} movieId={movieId} schedule={schData} />
					: <StepFinal movie={movie} schedule={schData} movieId={movieId} />
				}
			</Grid>
		</Grid>
	);
};

function StepFinal({movie, schedule, movieId}){
	const movieData = movie.filter(m=>m.MOVIE_NUM===movieId)[0];
	console.log(movieData);
	console.log(schedule);

	const stringToDate = (str) => {
		var year = str.substring(0,4);
		var mon = str.substring(4,6);
		var day = str.substring(6,8);
		var hour = str.substring(8,10);
		var min = str.substring(10,12);
	
		return year + '년 ' + mon + '월 ' + day + '일 ' + hour + '시 '+ min + '분';
	}
	// 영화 정보 넣어야함!
	return (
		<Grid className="stepFinal">
			<Grid className="FinalBody">
				<BeenhereIcon />
				<p style={{fontSize:'2rem',fontWeight:'bold', marginTop: '2rem'}}>결제가 완료되었습니다.</p>
				<Grid className="reserve-info">
					<Grid className="info-content">
						<Grid className="left">
							영화이름
						</Grid>
						<Grid className="right">
							{movieData.MOVIE_NAME}
						</Grid>
					</Grid>
					<Grid className="info-content">
						<Grid className="left">
							일시
						</Grid>
						<Grid className="right">
							{stringToDate(schedule.SCRN_DATE)}
						</Grid>
					</Grid>
					<Grid className="info-content">
						<Grid className="left">
							상영관
						</Grid>
						<Grid className="right">
							{schedule.ROOM_NAME}
						</Grid>
					</Grid>
					<Grid className="info-content">
						<Grid className="left">
							좌석
						</Grid>
					</Grid>
					<Grid className="info-content">
						<Grid className="left">
							총 가격
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Reserve;
