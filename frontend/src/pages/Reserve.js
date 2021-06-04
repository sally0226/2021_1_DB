import React, { useState } from 'react'

import { DotStepper, Header } from '../components'
import { Grid, Button } from '@material-ui/core';

function Reserve() {
	const steps = 4; // 예약 step 개수
	const [step, setStep] = useState(0);
	const title = ["상영시간", "인원좌석", "  결제  ", "결제완료"];

	const stepNextHandler = () => {
		if(step < 3)
			setStep(step+1);
	};
	const stepPrevHandler = () => {
		if(step > 1)
			setStep(step-1);
	};
	
	return (
		<Grid className="reserve">
			<Header />
			<DotStepper steps={steps} step={step} title={title} />
			<StepContent step={step} next={stepNextHandler} prev={stepPrevHandler} />
		</Grid>
	);
};

function StepContent ({step, next, prev}) {
	if(step===0) return stepZero({next});
	else if (step===1) return stepFirst({next, prev});
	else if (step===2) return stepSecond({next, prev});
	else return stepFinal({prev});
}

function stepZero({next}) {
	return (
		<Grid className="stepZero">
		</Grid>
	);
};
function stepFirst() {
	return (
		<Grid className="stepFirst">
			인원좌석
		</Grid>
	);
};
function stepSecond() {
	return (
		<Grid className="stepSecond">
			결제
		</Grid>
	);
};
function stepFinal(){
	return (
		<Grid className="stepFinal">
			결제완료
		</Grid>
	);
};

export default Reserve;
