import React, { useState, forwardRef } from 'react'
import { Grid } from '@material-ui/core';
import { RatingCircle } from '../components'
import DatePicker from "react-datepicker";

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
}

export default StepZero
