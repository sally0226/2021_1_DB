import React, { useState, forwardRef } from 'react'

import { Grid, Table, TableCell, TableHead, TableRow, TableBody, Button } from '@material-ui/core'
import DatePicker from "react-datepicker";
import { Header } from '../components'
import { useVisitorState } from '../MVVM/model/VisitorModel';
import dateToString from '../function/DateToString';

function Admin_enterList() {
	const [all, setAll] = useState(false);
	const visitors = useVisitorState();
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
							visitors.map((visitor, i)=>(
								<TableRow key={i}>
									<TableCell component="th" scope="row">
										{dateToString(visitor.Date)}
									</TableCell>
									<TableCell align="left">{visitor.room}</TableCell>
									<TableCell align="left">{visitor.name}</TableCell>
									<TableCell align="left">{visitor.number}</TableCell>
								</TableRow>
							))
							:
							visitors.map((visitor, i)=>(
								isSameDate(visitor.Date, selectedDate) &&
								<TableRow key={i}>
									<TableCell component="th" scope="row">
										{dateToString(visitor.Date)}
									</TableCell>
									<TableCell align="left">{visitor.room}</TableCell>
									<TableCell align="left">{visitor.name}</TableCell>
									<TableCell align="left">{visitor.number}</TableCell>
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
