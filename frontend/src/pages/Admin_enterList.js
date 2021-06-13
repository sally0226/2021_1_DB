import React, { useState, forwardRef } from 'react'

import { Grid, Table, TableCell, TableHead, TableRow, TableBody, Button } from '@material-ui/core'
import DatePicker from "react-datepicker";
import { Header } from '../components'
import { useVisitorState } from '../MVVM/model/VisitorModel';

const stringToDate = (str) => {
	var year = str.substring(0,4);
	var mon = str.substring(4,6);
	var day = str.substring(6,8);
	var hour = str.substring(8,10);
	var min = str.substring(10,12);
	var sec = str.substring(12,14);

	return year + '-' + mon + '-' + day + ' ' + hour + ':' + min + ':' + sec;
	// return '2021-06-14 01:19:00'
}

function Admin_enterList() {
	const [all, setAll] = useState(true);
	const visitors = useVisitorState();
	console.log(visitors);
	// <-- datepicker
	const [selectedDate, setSelectedDate] = useState(new Date());
	const handleDateChange = (date) => {
		setSelectedDate(date);
		setAll(false);
	};

	const CustomInput = forwardRef(({ value, onClick}, ref) => {
		const split = value.split('/')
		return (
			<button className="custom-input" onClick={onClick} ref={ref}>
				{split[2]}년 {split[0]}월 {split[1]}일
			</button>
		)
	});

	const isSameDate = (a, b) => {
		if(a.getFullYear() === b.getFullYear()){
			if(a.getMonth() === b.getMonth()){
				if(a.getDate() === b.getDate())
					return true;
			}
		}
		return false;
	}
	// datepicker -->

	return (
		<Grid className="admin-enterlist">
			<Header />
			<Grid className="body">
				<Grid className="dateGrid">
					{/* 추후 범위 선택 가능하게하기 */}
					<DatePicker
						selected={selectedDate}
						onChange={handleDateChange}
						customInput={<CustomInput />}
					/>
					{
						!all && <Button style={{backgroundColor:'#cacaca', marginLeft:'1rem', height:'50%'}} onClick={()=>setAll(true)}>전체보기</Button>
					}
				</Grid>
				<Table className="table">
					<TableHead>
						<TableCell>방문 시간</TableCell>
						<TableCell>방문 상영관</TableCell>
						<TableCell>방문자명</TableCell>
						<TableCell>연락처</TableCell>
					</TableHead>
					<TableBody>
						{
							all ? 
							visitors && visitors.map((visitor, i)=>(
								<TableRow key={i}>
									<TableCell component="th" scope="row">
										{stringToDate(visitor.VISIT_TIME).substring(0,16)}
									</TableCell>
									<TableCell align="left">{visitor.ROOM_NUM}</TableCell>
									<TableCell align="left">{visitor.VISIT_NAME}</TableCell>
									<TableCell align="left">{visitor.VISIT_CONTACT}</TableCell>
								</TableRow>
							))
							:
							visitors && visitors.map((visitor, i)=>(
								isSameDate(new Date(`${stringToDate(visitor.VISIT_TIME)}`), selectedDate) &&
								<TableRow key={i}>
									<TableCell component="th" scope="row">
										{stringToDate(visitor.VISIT_TIME).substring(0,16)}
									</TableCell>
									<TableCell align="left">{visitor.ROOM_NUM}</TableCell>
									<TableCell align="left">{visitor.VISIT_NAME}</TableCell>
									<TableCell align="left">{visitor.VISIT_CONTACT}</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</Grid>
		</Grid>
	)
}

export default Admin_enterList
