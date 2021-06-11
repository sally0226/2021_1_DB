import React, { useState, forwardRef } from 'react'
import axios from 'axios'
import { Header, RatingCircle } from '../components';
import { Grid, TextField, Button } from '@material-ui/core';
import DatePicker from "react-datepicker";

function MovieSchedule() {
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
		<Grid className="movieschedule">
			<Header />
			<Grid className="content">
				<Grid className="dateGrid">
					<DatePicker
						selected={selectedDate}
						onChange={handleDateChange}
						customInput={<CustomInput />}
					/>
				</Grid>

				{/* 나중에 map으로 처리하기 */}
				<Grid className="timeGrid">
					<Grid className="time-con">
						<Grid className="timeGrid-head">
							<Grid
								style={{
									width:'2rem',
									height:'2rem',
									color:'white',
									marginRight:'5px'}}
							><RatingCircle /></Grid>
							dd
						</Grid>
						<Grid className="timeGrid-body">
							<Grid className="timeGrid-content">
								<Grid style={{fontWeight:'bold', marginBottom:'5px'}}>16:25</Grid>
								<Grid style={{fontSize:'0.5rem'}}>100/200 1관</Grid>
							</Grid>
							<Grid className="timeGrid-content">
								<Grid style={{fontWeight:'bold', marginBottom:'5px'}}>16:25</Grid>
								<Grid style={{fontSize:'0.5rem'}}>100/200 1관</Grid>
							</Grid>
						</Grid>
					</Grid>

					<Grid className="time-con">
						<Grid className="timeGrid-head">
							<Grid
								style={{
									width:'2rem',
									height:'2rem',
									color:'white',
									marginRight:'5px'}}
							><RatingCircle /></Grid>
							dd
						</Grid>
						<Grid className="timeGrid-body">
							<Grid className="timeGrid-content">
								<Grid style={{fontWeight:'bold', marginBottom:'5px'}}>16:25</Grid>
								<Grid style={{fontSize:'0.5rem'}}>100/200 1관</Grid>
							</Grid>
							<Grid className="timeGrid-content">
								<Grid style={{fontWeight:'bold', marginBottom:'5px'}}>16:25</Grid>
								<Grid style={{fontSize:'0.5rem'}}>100/200 1관</Grid>
							</Grid>
						</Grid>
					</Grid>

					<Grid className="time-con">
						<Grid className="timeGrid-head">
							<Grid
								style={{
									width:'2rem',
									height:'2rem',
									color:'white',
									marginRight:'5px'}}
							><RatingCircle /></Grid>
							dd
						</Grid>
						<Grid className="timeGrid-body">
							<Grid className="timeGrid-content">
								<Grid style={{fontWeight:'bold', marginBottom:'5px'}}>16:25</Grid>
								<Grid style={{fontSize:'0.5rem'}}>100/200 1관</Grid>
							</Grid>
							<Grid className="timeGrid-content">
								<Grid style={{fontWeight:'bold', marginBottom:'5px'}}>16:25</Grid>
								<Grid style={{fontSize:'0.5rem'}}>100/200 1관</Grid>
							</Grid>
						</Grid>
					</Grid>

					
				</Grid>
			</Grid>
		</Grid>
	)
}

export default MovieSchedule
