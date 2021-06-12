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
	
	return (
		<Grid className="reserve">
			<Header />
			<DotStepper steps={steps} step={step} title={title} />
			<Grid className="step-grid">
				{
					step===0 ?
					<StepZero next={stepNextHandler} prev={stepPrevHandler} selectMovie={setMovieId} data={movie}/>
					: step === 1 ?
					<StepFirst next={stepNextHandler} prev={stepPrevHandler} />
					: step === 2 ?
					<StepSecond next={stepNextHandler} prev={stepPrevHandler} data={movie} movieId={movieId} />
					: <StepFinal />
				}
			</Grid>
		</Grid>
	);
};

function StepFinal(){
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
							hi
						</Grid>
					</Grid>
					<Grid className="info-content">
						<Grid className="left">
							일시
						</Grid>
					</Grid>
					<Grid className="info-content">
						<Grid className="left">
							상영관
						</Grid>
					</Grid>
					<Grid className="info-content">
						<Grid className="left">
							좌석
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Reserve;
