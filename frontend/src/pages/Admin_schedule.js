import React, { useState, forwardRef, useEffect, useReducer } from 'react'

import { Grid, Table, TableCell, TableHead, TableRow, TableBody, Button, TextField, Select, MenuItem } from '@material-ui/core'
import { Header } from '../components'
import DatePicker from "react-datepicker";
import dateToString from '../function/DateToString';

import axios from 'axios';
import { API_URL } from '../CommonVariable';

function dateTimeToString(dates){
    const date = new Date(dates);
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    var hours = date.getHours();
    var mins = date.getMinutes();
    return  year + '/' + month + '/' + day+' '+hours+'시'+mins+"분"; 
}
function dataReducer(state, action) {
    switch (action.type) {
        case 'SET':
            return action.data;
        case 'DELETE':
            return state.filter(item => item.SCHEDULE_NUM != action.index);
       
        //case 'MODIFY':
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function Admin_schedule() {
	const [all, setAll] = useState(false); // 전체보기 여부
	useEffect(()=>{
		//selectedDate 에 해당하는 상영일정들 받아오기 
		axios.get(`${API_URL}/schedule`).then(response=>{
			console.log(response.data);
			setScheduleList(response.data);
			// console.log(roomList);
		});
	},[]);
	
	const [scheduleList, setScheduleList] = useState([]);
	
	const [mode, setMode] = useState(-1); // -1 : list, 0: add
	const [roomList, setRoomList] = useState([]);
	const [movieList, setMovieList] = useState([]);
	useEffect(()=>{
		//상영관 리스트 받아오기 
		axios.get(`${API_URL}/room`).then(response=>{
			const rooms = response.data;
			// console.log(rooms);
			setRoomList(rooms.rooms);
			// console.log(roomList);
		});
		axios.get(`${API_URL}/movie`).then(response=>{
			// console.log(response.data);
			setMovieList(response.data);
			// console.log(movieList);
		});
	},[]);
	const [newData, setNewData] = useState({
		ROOM_NUM : 1,
		MOVIE_NUM : 1,
		SCRN_DATE: new Date(),

	});
	const handlerMode = (id) => {
		console.log(id);
		if(id===mode) setMode(-1);
		else setMode(id);
	}
	const handlerAdd = () => {
		setMode(0);
	}
	const [id, setId] = useState();
	const [movie, setMovie] = useState();
	const [date, setDate] = useState();
	
	const [selectedDate, setSelectedDate] = useState(new Date()); //상영일정들 조회할 날짜
	const handleDateChange = (date) => {
		setSelectedDate(date);
		setAll(false);
	};

	const CustomInput = forwardRef(({ value, onClick}, ref) => {
		const split = value.split('/');
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
	const updateField = e => {
        console.log(e.target.name);
		console.log(e.target.value);
        setNewData({
          ...newData,
          [e.target.name]: e.target.value
          
        });
        //console.log(newData);
    };
	  const modifyField = e => {
		console.log(e.currentTarget);
		console.log(e.target.name);
		setScheduleList(
			scheduleList.map(item => item.SCHEDULE_NUM == e.currentTarget.id ? {...item, [e.target.name]: e.target.value}: item)
		);
		
        console.log(scheduleList);
    };
	const onClickAdd = () => { //등록버튼 클릭 
		// insert 상영일정 api 호출 
		axios.post(`${API_URL}/schedule`, newData)
		.then(response=>{
			if(response.data.success){
				alert(`상영일정이 등록되었습니다.`);
				//window.location.href='/';
				axios.get(`${API_URL}/schedule`).then(response=>{
					console.log(response.data);
					setScheduleList(response.data);
					// console.log(roomList);
				});
				setMode(-1);
			}
			else
				alert(response.data.message);
		});
	}
	const onClickUpdate = (schedule_num) => {
		console.log("update");
		handlerMode(schedule_num);
		const body = scheduleList.filter(sche => sche.SCHEDULE_NUM == schedule_num)[0];
		console.log(body);
		axios.put(`${API_URL}/schedule/${schedule_num}`, body)
		.then(response=>{
			if(response.data.success){
				alert(`상영일정이 수정되었습니다.`);
				//window.location.href='/';
				axios.get(`${API_URL}/schedule`).then(response=>{
					console.log(response.data);
					setScheduleList(response.data);
					// console.log(roomList);
				});
				setMode(-1);
			}
			else
				alert(response.data.message);
		});
	}
	const onClickDelete = (schedule_num) => {
		axios.delete(`${API_URL}/schedule/${schedule_num}`)
		.then(response=>{
			if(response.data.success){
				alert(`상영일정이 삭제되었습니다.`);
				//window.location.href='/';
				axios.get(`${API_URL}/schedule`).then(response=>{
					console.log(response.data);
					setScheduleList(response.data);
					// console.log(roomList);
				});
				setMode(-1);
			}
			else
				alert(response.data.message);
		});
	}
	// datepicker -->
	return (
		<Grid className="adminschedule">
			<Header />
			<Grid className="body">
				<Grid className="dateGrid">
					<DatePicker
						selected={selectedDate}
						onChange={handleDateChange}
						customInput={<CustomInput />}
						dateFormat="MM/dd/yyyy"
					/>
					{
						!all && <Button style={{backgroundColor:'#cacaca', marginLeft:'1rem', height:'50%'}} onClick={()=>setAll(true)}>전체보기</Button>
					}
				</Grid>
				<Table className="table">
					<TableHead>
						<TableCell align="center" style={{width:'15%'}}>상영관</TableCell>
						<TableCell align="center" style={{width:'20%'}}>영화</TableCell>
						<TableCell align="center" style={{width:'20%'}}>상영 날짜/시간</TableCell>
						<TableCell align="center" style={{width:'15%'}}>
							<Button style={{backgroundColor:'#985555', color:'white'}} onClick={handlerAdd}>추가</Button>
						</TableCell>
					</TableHead>

					<TableBody>
						{
							scheduleList.length> 0 ? scheduleList.map((data)=>{
								if(data.SCHEDULE_NUM===mode){
									return(
									<TableRow>
										<TableCell align="center" style={{width:'15%'}}>
											<Select
												variant="filled"
												margin="normal"
												name="ROOM_NUM"
												id={data.SCHEDULE_NUM}
												placeholder={data.ROOM_NUM}
												required
												autoFocus
												style={{
													width: '10vw',
													backgroundColor: 'transparent !important',
												}}
												// InputProps={{
												// 	className: classes.input
												// }}
												value={data.ROOM_NUM}
												onChange={modifyField}
											>
												{roomList.map((room) => (
													<MenuItem id={data.SCHEDULE_NUM} value={room.ROOM_NUM}>
														{room.ROOM_NUM}
													</MenuItem>
												))}
											</Select>
											{/* <TextField value={data.ROOM_NUM} onChange={(e)=>setId(e.target.value)} /> */}
										</TableCell>
										<TableCell align="center" style={{width:'20%'}}>
											<Select
												variant="filled"
												margin="normal"
												name="MOVIE_NUM"
												placeholder={data.MOVIE_NUM}
												required
												autoFocus
												style={{
													width: '10vw',
													backgroundColor: 'transparent !important',
												}}
												value={data.MOVIE_NUM}
												onChange={modifyField}
											>
												{movieList.map((movie) => (
													<MenuItem id={data.SCHEDULE_NUM} value={movie.MOVIE_NUM}>
														{movie.MOVIE_NAME}
													</MenuItem>
												))}
											</Select>
											{/* <TextField value={movieList.length>0 ? movieList.filter(movie => movie.MOVIE_NUM === data.MOVIE_NUM)[0].MOVIE_NAME : null} onChange={(e)=>setMovie(e.target.value)} /> */}
										</TableCell>
										<TableCell align="center" style={{width:'20%'}}>
											<DatePicker selected={new Date(data.SCRN_DATE)} onChange={(date)=>setScheduleList(scheduleList.map(item => item.SCHEDULE_NUM == data.SCHEDULE_NUM ? {...item, 'SCRN_DATE': date}: item))} 
											timeInputLabel="Time:"
											dateFormat="MM/dd/yyyy hh:mm aa"
											showTimeInput/>
										</TableCell>
										<TableCell align="center" style={{width:'15%'}}>
											<Grid className="btn-con">
												<Button onClick={()=>onClickUpdate(data.SCHEDULE_NUM)}  style={{backgroundColor:'#985555', color:'white'}}>완료</Button>
												<Button onClick={()=>handlerMode(data.SCHEDULE_NUM)} style={{backgroundColor:'#985555', color:'white'}}>취소</Button>
											</Grid>
										</TableCell>
								</TableRow>)
								}
								else{
									return(
									all? 
									<TableRow>
										<TableCell align="center" style={{width:'15%'}}>{data.ROOM_NUM}</TableCell>
										<TableCell align="center" style={{width:'20%'}}>{movieList.length>0 ? movieList.filter(movie => movie.MOVIE_NUM === data.MOVIE_NUM)[0].MOVIE_NAME : null}</TableCell>
										<TableCell align="center" style={{width:'20%'}}>{dateTimeToString(data.SCRN_DATE)}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>
											<Grid className="btn-con">
												<Button style={{backgroundColor:'#985555', color:'white'}} onClick={()=>handlerMode(data.SCHEDULE_NUM)}>수정</Button>
												<Button onClick={()=>onClickDelete(data.SCHEDULE_NUM)} style={{backgroundColor:'#985555', color:'white'}}>삭제</Button>
											</Grid>
										</TableCell>
									</TableRow>
									:
									isSameDate(new Date(data.SCRN_DATE), selectedDate) &&
									<TableRow>
										<TableCell align="center" style={{width:'15%'}}>{data.ROOM_NUM}</TableCell>
										<TableCell align="center" style={{width:'20%'}}>{movieList.length>0 ? movieList.filter(movie => movie.MOVIE_NUM === data.MOVIE_NUM)[0].MOVIE_NAME : null}</TableCell>
										<TableCell align="center" style={{width:'20%'}}>{dateTimeToString(data.SCRN_DATE)}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>
											<Grid className="btn-con">
												<Button style={{backgroundColor:'#985555', color:'white'}} onClick={()=>handlerMode(data.SCHEDULE_NUM)}>수정</Button>
												<Button onClick={()=>handlerMode(data.SCHEDULE_NUM)} style={{backgroundColor:'#985555', color:'white'}}>취소</Button>
											</Grid>
										</TableCell>
								</TableRow>
								)}
							}) : null
						}
						{
							mode===0?
								<TableRow>
									<TableCell className ="scrn-room" align="center" style={{width:'15%'}}>
										<Select
											variant="filled"
											margin="normal"
											name="ROOM_NUM"
											placeholder={newData.ROOM_NUM}
											required
											autoFocus
											style={{
												width: '10vw',
												backgroundColor: 'transparent !important',
											}}
											// InputProps={{
											// 	className: classes.input
											// }}
											value={newData.ROOM_NUM}
											onChange={updateField}
										>
											{roomList.map((room) => (
												<MenuItem value={room.ROOM_NUM}>
													{room.ROOM_NUM}
												</MenuItem>
											))}
										</Select>
									</TableCell>
									<TableCell align="center" style={{width:'20%'}}>
									<Select
											variant="filled"
											margin="normal"
											name="MOVIE_NUM"
											placeholder={newData.MOVIE_NUM}
											required
											autoFocus
											style={{
												width: '10vw',
												backgroundColor: 'transparent !important',
											}}
											// InputProps={{
											// 	className: classes.input
											// }}
											value={newData.MOVIE_NUM}
											onChange={updateField}
										>
											{movieList.map((movie) => (
												<MenuItem key={movie.MOVIE_NUM} value={movie.MOVIE_NUM}>
													{movie.MOVIE_NAME}
												</MenuItem>
											))}
										</Select>
									</TableCell>
									<TableCell align="center" style={{width:'20%'}}>
										<DatePicker selected={newData.SCRN_DATE} 
											onChange={(date)=>setNewData({...newData, SCRN_DATE: date})} 
											timeInputLabel="Time:"
											dateFormat="MM/dd/yyyy hh:mm aa"
											showTimeInput
										/>	
									</TableCell>
									<TableCell align="center" style={{width:'15%'}}>
										<Grid className="btn-con">
											<Button style={{backgroundColor:'#985555', color:'white'}} onClick={onClickAdd}>등록</Button> 
											<Button style={{backgroundColor:'#985555', color:'white'}} onClick={()=>handlerMode(0)}>삭제</Button>
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
