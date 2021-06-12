import React, { forwardRef, useState, useEffect } from 'react'

import { Grid, Button, FilledInput, FormControl, FormHelperText, InputAdornment, Link } from '@material-ui/core';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import BeenhereIcon from '@material-ui/icons/Beenhere';
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

	// if(step===0) return StepZero({next, data, selectMovie});
	// else if (step===1) return StepFirst({next, prev});
	// else if (step===2) return StepSecond({next, prev, data, movieId});
	// else return StepFinal({prev});
	return StepFirst({next, prev});
}

function StepZero({next, data, selectMovie}) {
	const [selectedMovie, setSelectedMovie] = useState(0);
	const handleMovieSelect = (i) => {
		setSelectedMovie(i);
		selectMovie(i);
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
	
	const seatRow = 10;
	const seatCol = 20;
	var seatsData = [[{
		id: 'A1',
		status: 0,
		rating: 0
	},{
		id: 'A2',
			status: 1,
			rating: 0
	},{
		id: 'A3',
			status: 0,
			rating: 0
	},{
		id: 'A4',
			status: 0,
			rating: 0
	},{
		id: 'A5',
			status: 0,
			rating: 0
	}],[{
		id: 'B1',
		status: 0,
		rating: 1
	},{
		id: 'B2',
		status: 0,
		rating: 1
	},{
		id: 'B3',
		status: 0,
		rating: 1
	},{
		id: 'B4',
		status: 0,
		rating: 1
	},{
		id: 'B5',
		status: 0,
		rating: 1
	}]];
	const arr = Array.from(Array(seatRow), () => Array(seatCol).fill(false))
	const [selectInfo, setSelectInfo] = useState({"arr": arr});

	// useEffect(() => {}, [selectInfo]);
	console.log(selectInfo);
	function handelClick(e){
		const c = e.target.getAttribute('c');
		const r = e.target.getAttribute('r');
		console.log("clicked");
		const newState = selectInfo.arr;
		// console.log(r +" " +c);
		// console.log(newState[0]);
		newState[r][c] = !newState[r][c];
		setSelectInfo({arr: newState});
		console.log(selectInfo);
		
	}
	function Seat(props) {
		if (selectInfo.arr[props.r][props.c] == true) {
			return (
				<div className="selected-seat"
					id={props.id}
					r={props.r}
					c={props.c}
					onClick={handelClick}>
				</div>
			)
		}
		else {
			return (
				<div className="seat"
					id={props.id}
					r={props.r}
					c={props.c}
					onClick={handelClick}>
				</div>
			)
		}	
	}
	
	
	return (
		<Grid className="stepFirst">
			<Grid className="label">
				
			</Grid>
			<Grid className="map">
				<Grid className="screen">S C R E E N</Grid>
				<Grid className="seats">
					{[...Array(seatRow)].map((r, indexR) => (
						<Grid className="seat-row" id={indexR}>
							{[...Array(seatCol)].map((c, indexC) => (
								<Seat isSelected={0} r={indexR} c={indexC}/>
							))}
						</Grid>
					))}
					
				</Grid>
			</Grid>			
		</Grid>
	)
};
function StepSecond({next, prev, data, movieId}) {
	const [point, setPoint] = useState(0);
	const [DC, setDC] = useState(-1);
	const [payment, setPayment] = useState(0);

	const handlerDCClick = (i) => {
		if(i===DC) setDC(-1); // 다시 누르면 취소
		else setDC(i);
	}

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
						<p className="content-head">포인트 사용</p>
						<FormControl>
							<FilledInput
								value={point}
								onChange={(e)=>setPoint(e.target.value)}
								endAdornment={<InputAdornment position="end">원</InputAdornment>}
								disableUnderline
							/>
							<FormHelperText>잔여 포인트 : </FormHelperText>
						</FormControl>
					</Grid>
					<Grid className="middle-content">
						<p className="content-head">할인</p>
						{/* 할인 방법 불러오기 */}
						<Grid className="DC-grid">
							<Grid className={DC === 0 ? 'DC-content content-active' : 'DC-content'} onClick={()=>handlerDCClick(0)}>
								skt멤버쉽
							</Grid>
							<Grid className={DC === 1 ? 'DC-content content-active' : 'DC-content'} onClick={()=>handlerDCClick(1)}>
								kt멤버쉽
							</Grid>
						</Grid>
					</Grid>
					<Grid className="middle-content">
						<p className="content-head">결제방법</p>
						<Grid className="payment-grid">
							<Grid className={payment===0 ? 'payment-content content-active' : 'payment-content'} onClick={()=>setPayment(0)}>
								<CreditCardIcon />
								신용카드
							</Grid>
							<Grid className={payment===1 ? 'payment-content content-active' : 'payment-content'} onClick={()=>setPayment(1)}>
								<AccountBalanceWalletIcon />
								무통장입금
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={3} className="final">
				<Grid className="SecondHead">
					결제하기
				</Grid>
				<Grid className="SecondBody">
					<Grid className="final-row">
						<p className="final-head">상품금액</p>
						<p style={{fontWeight:'bold'}}>원</p>
					</Grid>
					<Grid className="final-row">
						<p className="final-head">할인금액</p>
						<p style={{fontWeight:'bold'}}>원</p>
					</Grid>
					<Grid className="final-row">
						<p className="final-head">총 금액</p>
						<p style={{fontWeight:'bold'}}>원</p>
					</Grid>
					<Button
						variant="contained"
						fullWidth
						style={{
							backgroundColor:'#985555',
							color:'white',
							fontWeight:'bold',
							marginBottom:'1rem',
						}}
						onClick={next}
					>
						결제하기
					</Button>
					<Button
						variant="contained"
						fullWidth
						style={{
							backgroundColor:'gray',
							color:'white',
							marginBottom:'1rem',
						}}
						onClick={prev}
					>
						이전단계
					</Button>
					<Button
						variant="contained"
						fullWidth
						style={{
							backgroundColor:'gray',
							color:'white',
							textDecoration:'none'
						}}
						component={Link}
						href="/"
					>
						취소하기
					</Button>
				</Grid>
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
