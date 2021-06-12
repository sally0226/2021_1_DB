import React, { useState, forwardRef } from 'react'

import { Grid, Table, TableCell, TableHead, TableRow, TableBody, Button, TextField } from '@material-ui/core'
import { Header } from '../components'
import DatePicker from "react-datepicker";
import dateToString from '../function/DateToString';

function Admin_schedule() {
	// 임시데이터
	const [temp, setTemp] = useState([{
		id: 1,
		movie: 3,
		date: new Date(),
		start: 14,
	},{
		id: 2,
		movie: 3,
		date: new Date("2021-06-11"),
		start: 16,
	}]);

	const [mode, setMode] = useState(-1); // -1 : list, 0: add

	const [id, setId] = useState(0);
	const [movie, setMovie] = useState("");
	const [date, setDate] = useState("");
	const [start, setStart] = useState(0);

	const handlerMode = (id) => {
		if(id===mode) setMode(-1);
		else setMode(id);
		setId(temp[id-1].id);
		setMovie(temp[id-1].movie);
		setDate(temp[id-1].date);
		setStart(temp[id-1].start);
	}

	const handlerAdd = () => {
		setMode(0);
		setId(0);
		setMovie(0);
		setDate(0);
		setStart(0);
	}


	const [all, setAll] = useState(true);
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
		<Grid className="adminschedule">
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
						<TableCell align="center" style={{width:'15%'}}>상영관</TableCell>
						<TableCell align="center" style={{width:'20%'}}>영화</TableCell>
						<TableCell align="center" style={{width:'20%'}}>날짜</TableCell>
						<TableCell align="center" style={{width:'20%'}}>시작시간</TableCell>
						<TableCell align="center" style={{width:'15%'}}>
							<Button style={{backgroundColor:'#985555', color:'white'}} onClick={handlerAdd}>추가</Button>
						</TableCell>
					</TableHead>

					<TableBody>
						{
							temp.map((data)=>{
								if(data.id===mode){
									return(
									<TableRow>
										<TableCell align="center" style={{width:'15%'}}>
											<TextField value={id} onChange={(e)=>setId(e.target.value)} />
										</TableCell>
										<TableCell align="center" style={{width:'20%'}}>
											<TextField value={movie} onChange={(e)=>setMovie(e.target.value)} />
										</TableCell>
										<TableCell align="center" style={{width:'20%'}}>
											<DatePicker selected={date} onChange={(date)=>setDate(date)} />
										</TableCell>
										<TableCell align="center" style={{width:'20%'}}>
											<TextField value={start} onChange={(e)=>setStart(e.target.value)} />
										</TableCell>
										<TableCell align="center" style={{width:'15%'}}>
											<Grid className="btn-con">
												<Button onClick={()=>handlerMode(data.id)}  style={{backgroundColor:'#985555', color:'white'}}>등록</Button>
												<Button style={{backgroundColor:'#985555', color:'white'}}>취소</Button>
											</Grid>
										</TableCell>
								</TableRow>)
								}
								else{
									return(
									all? 
									<TableRow>
										<TableCell align="center" style={{width:'15%'}}>{data.id}</TableCell>
										<TableCell align="center" style={{width:'20%'}}>{data.movie}</TableCell>
										<TableCell align="center" style={{width:'20%'}}>{dateToString(data.date)}</TableCell>
										<TableCell align="center" style={{width:'20%'}}>{data.start}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>
											<Grid className="btn-con">
												<Button style={{backgroundColor:'#985555', color:'white'}} onClick={()=>handlerMode(data.id)}>수정</Button>
												<Button style={{backgroundColor:'#985555', color:'white'}}>삭제</Button>
											</Grid>
										</TableCell>
									</TableRow>
									:
									isSameDate(data.date, selectedDate) &&
									<TableRow>
										<TableCell align="center" style={{width:'15%'}}>{data.id}</TableCell>
										<TableCell align="center" style={{width:'20%'}}>{data.movie}</TableCell>
										<TableCell align="center" style={{width:'20%'}}>{dateToString(data.date)}</TableCell>
										<TableCell align="center" style={{width:'20%'}}>{data.start}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>
											<Grid className="btn-con">
												<Button style={{backgroundColor:'#985555', color:'white'}} onClick={()=>handlerMode(data.id)}>수정</Button>
												<Button style={{backgroundColor:'#985555', color:'white'}}>삭제</Button>
											</Grid>
										</TableCell>
								</TableRow>
								)}
							})
						}
						{
							mode===0?
								<TableRow>
									<TableCell align="center" style={{width:'15%'}}>
										<TextField value={id} onChange={(e)=>setId(e.target.value)} />
									</TableCell>
									<TableCell align="center" style={{width:'20%'}}>
										<TextField value={movie} onChange={(e)=>setMovie(e.target.value)} />
									</TableCell>
									<TableCell align="center" style={{width:'20%'}}>
										<TextField value={date} onChange={(e)=>setDate(e.target.value)} />	
									</TableCell>
									<TableCell align="center" style={{width:'20%'}}>
										<TextField value={start} onChange={(e)=>setStart(e.target.value)} />
									</TableCell>
									<TableCell align="center" style={{width:'15%'}}>
										<Grid className="btn-con">
											<Button style={{backgroundColor:'#985555', color:'white'}}>등록</Button>
											<Button style={{backgroundColor:'#985555', color:'white'}}>삭제</Button>
										</Grid>
									</TableCell>
								</TableRow>
							:null
						}
					</TableBody>
				</Table>
			</Grid>
		</Grid>
	)
}

export default Admin_schedule;
