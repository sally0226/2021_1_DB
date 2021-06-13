import React, { useState, forwardRef, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import { RatingCircle } from '../components'
import DatePicker from "react-datepicker";
import axios from 'axios';
import { API_URL } from '../CommonVariable';

function StepZero({next, data, selectMovie}) {
	console.log(data);
	// <-- 스케쥴 데이터
	const [schData, setSchData] = useState();
	async function getSchedule(){
		await axios.get(`${API_URL}/schedule`)
		.then(res => {
			setSchData(res.data);
		})
	}
	console.log(schData);
	useEffect(() => {
		getSchedule()
	}, [])
	// 스케쥴 데이터 -->

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
							data && data.map((movie)=>(
								movie.SCRN_STATUS=='Y' &&
								<Grid className={selectedMovie===movie.MOVIE_NUM ? 'leftContent leftContent-active' : 'leftContent'} onClick={() => handleMovieSelect(movie.MOVIE_NUM)}>
									{movie.MOVIE_NAME}
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
							{data[selectedMovie-1] != undefined && data[selectedMovie-1].MOVIE_NAME}
						</Grid>
						<Grid className="timeGrid-body">
							{/* todo: 조금더 알맞은 데이터를 가져오기 */}
							{
								schData && schData.map(sch=>{
									return(sch.MOVIE_NUM === selectedMovie &&
									<Grid className="timeGrid-content" onClick={next}>
										<Grid style={{fontWeight:'bold', marginBottom:'5px'}}>{sch.SCRN_DATE.substring(14,19)}</Grid>
										<Grid style={{fontSize:'0.5rem'}}>{sch.RESIDUAL_SEAT}석 {sch.ROOM_NUM}관</Grid>
									</Grid>)
								})
							}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default StepZero
