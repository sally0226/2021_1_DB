import React, { forwardRef, useState } from 'react'

import { Grid, Button, FilledInput, FormControl, FormHelperText, InputAdornment } from '@material-ui/core';
import DatePicker from "react-datepicker";
import { DotStepper, Header, RatingCircle } from '../components'
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
	
	return (
		<Grid className="reserve">
			<Header />
			<DotStepper steps={steps} step={step} title={title} />
			<Grid className="step-grid">
				<StepContent
					step={step}
					next={stepNextHandler}
					prev={stepPrevHandler}
					data={movie}
					selectMovie={setMovieId}
					movieId={movieId}
				/>
			</Grid>
		</Grid>
	);
};

function StepContent ({step, next, prev, data, selectMovie, movieId}) {
	if(step===0) return StepZero({next, data, selectMovie});
	else if (step===1) return StepFirst({next, prev});
	else if (step===2) return StepSecond({next, prev, data, movieId});
	else return StepFinal({prev});
}

function StepZero({next, data, selectMovie}) {
	const [selectedMovie, setSelectedMovie] = useState(0);
	const handleMovieSelect = (i) => {
		setSelectedMovie(i);
		selectedMovie(i);
	}
	const [selectedDate, setSelectedDate] = useState(new Date());
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const CustomInput = forwardRef(({ value, onClick}, ref) => {
		const split = value.split('/')
		return (
			<button className="custom-input" onClick={onClick} ref={ref}>
				{split[2]}년 {split[0]}월 {split[1]}일
			</button>
		)
	});
	return (
		<Grid className="stepZero">
			<Grid item xs={6} className="left">
				<Grid className={`${'right-border'} ${'zeroHead'}`}>
					영화선택
				</Grid>
				<Grid className={`${'right-border'} ${'zeroBody'}`}>
					<Grid className="movie-con">
						{
							data.map((movie, i)=>(
								movie.isScreen &&
								<Grid className={selectedMovie===i ? 'leftContent leftContent-active' : 'leftContent'} onClick={() => handleMovieSelect(i)}>
									{movie.name}
								</Grid>
							))
						}
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6} className="right">
				<Grid className="zeroHead">
					날짜선택
				</Grid>
				<Grid className="zeroBody">
					{/* 추후 custom 하기 */}
					<Grid className="dateGrid">
						<DatePicker
							selected={selectedDate}
							onChange={handleDateChange}
							customInput={<CustomInput />}
						/>
					</Grid>
					<Grid className="timeGrid">
						<Grid className="timeGrid-head">
							<Grid
								style={{
									width:'2rem',
									height:'2rem',
									color:'white',
									marginRight:'5px'}}
							><RatingCircle /></Grid>
							{data[selectedMovie].name}
						</Grid>
						<Grid className="timeGrid-body">
							<Grid className="timeGrid-content" onClick={next}>
								<Grid style={{fontWeight:'bold', marginBottom:'5px'}}>16:25</Grid>
								<Grid style={{fontSize:'0.5rem'}}>100/200 1관</Grid>
							</Grid>
							<Grid className="timeGrid-content" onClick={next}>
								<Grid style={{fontWeight:'bold', marginBottom:'5px'}}>16:25</Grid>
								<Grid style={{fontSize:'0.5rem'}}>100/200 1관</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
function StepFirst({next, prev}) {
	return (
		<Grid className="stepFirst">
			인원좌석
			<Button onClick={prev}>prev</Button>
			<Button onClick={next}>next</Button>
		</Grid>
	);
};
function StepSecond({next, prev, data, movieId}) {
	const [point, setPoint] = useState(0);

	return (
		<Grid className="stepSecond">
			<Grid item xs={3} className="left">
				<Grid className={`${'right-border'} ${'SecondHead'}`}>
					예매정보
				</Grid>
				<Grid className={`${'right-border'} ${'SecondBody'}`}>
					<Grid className="poster" />
					<Grid className="left-content-head">
							<Grid
								style={{
									width:'1.5rem',
									height:'1.5rem',
									color:'white',
									marginRight:'5px'}}
							><RatingCircle /></Grid>
							{data[movieId].name}
					</Grid>
					<Grid className="movie-info">
						<Grid className="movie-info-col">
							<p className="margin-bot">일시</p>
							<p className="margin-bot">상영관</p>
							<p>좌석</p>
						</Grid>
						<Grid className="movie-info-col2">
							<p className="margin-bot">날짜정보</p>
							<p className="margin-bot">상영관정보</p>
							<p className="margin-bot">좌석정보</p>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6} className="middle">
				<Grid className={`${'right-border'} ${'SecondHead'}`}>
					결제수단
				</Grid>
				<Grid className={`${'right-border'} ${'SecondBody'}`}>
					<Grid className="middle-content">
						<p className="content-head">할인/포인트</p>
						<FormControl>
							<FilledInput
								value={point}
								onChange={(e)=>setPoint(e.target.value)}
								endAdornment={<InputAdornment position="end">원</InputAdornment>}
							/>
							<FormHelperText>잔여 포인트 : </FormHelperText>
						</FormControl>
					</Grid>
					<Grid className="middle-content">
						<p className="content-head">결제방법</p>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={3} className="final">
				<Grid className="SecondHead">
					결제하기
				</Grid>
				<Grid className="SecondBody">
					hi
				</Grid>
			</Grid>
		</Grid>
	);
};
function StepFinal(){
	return (
		<Grid className="stepFinal">
			결제완료
		</Grid>
	);
};

export default Reserve;
