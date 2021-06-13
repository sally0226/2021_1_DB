import React, { useState, useEffect } from 'react'

import { Grid, Table, TableCell, TableHead, TableRow, TableBody, Button, TextField, Select, MenuItem } from '@material-ui/core';
import { Header } from '../components'
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { API_URL } from '../CommonVariable';

function Admin_screenroom() {
	const [roomList, setRoomList] = useState([]);
	const [exitList, setExitList] = useState([]);
	const [exitCodeList, setExitCodeList] = useState([]);

	useEffect(()=>{
		//상영관 리스트 받아오기 
		axios.get(`${API_URL}/room`).then(response=>{
			setRoomList(response.data.rooms);
			setExitList(response.data.exits);
		});
		axios.get(`${API_URL}/codes/emc_exit`).then(response=>{
			setExitCodeList(response.data);
		});
		
	},[]);

	// console.log(roomList);
	console.log(exitList);
	console.log(exitCodeList);
	console.log(exitCodeList.map(exit => exit.CODE_NAME));
	const [temp, setTemp] = useState([{
		id: 1,
		row: 3,
		col: 30,
		sum: 90,
		exit: [2,3,4]
	},{
		id: 2,
		row: 3,
		col: 10,
		sum: 30,
		exit: [1,2]
	}]);

	const [mode, setMode] = useState(-1); // -1 : list, 0: add

	const [newData, setNewData] = useState({
		ROOM_NAME: "",
		ROW_NUM: 0,
		COL_NUM: 0,
		TOTAL_SEAT_CAP: 0,
	});
	const updateField = e => {
        // console.log(e.target.name);
		// console.log(e.target.value);
        setNewData({
          ...newData,
          [e.target.name]: e.target.value
          
        });
        //console.log(newData);
    };
	const [id, setId] = useState(0);
	const [row, setRow] = useState(0);
	const [col, setCol] = useState(0);
	const [sum, setSum] = useState(0);
	const [exit, setExit] = useState(0);

	const handlerMode = (id) => {
		if(id===mode) setMode(-1);
		else setMode(id);
	}

	const handlerAdd = () => {
		setMode(0);
		setId(0);
		setRow(0);
		setCol(0);
		setSum(0);
		setExit(0);
	}

	const handlerExit = (text) => {
		// 입력받은 exit 배열로~
		// 대신 꼭 띄어쓰기 없이 , <- 이걸 구분자로 이용~!
		var arr = text.split(",");
		setExit(arr);
	}
	const onClickAdd = () => { //등록버튼 클릭 
		// insert 상영일정 api 호출 
		axios.post(`${API_URL}/room`, newData)
		.then(response=>{
			if(response.data.success){
				alert(`상영관이 등록되었습니다.`);
				//window.location.href='/';
				axios.get(`${API_URL}/room`).then(response=>{
					setRoomList(response.data.rooms);
					setExitList(response.data.exits);
				});
				setMode(-1);
			}
			else
				alert(response.data.message);
		});
	}
	const onClickDelete = (room_num) => {
		axios.delete(`${API_URL}/room/${room_num}`)
		.then(response=>{
			if(response.data.success){
				alert(`상영관이 삭제되었습니다.`);
				//window.location.href='/';
				axios.get(`${API_URL}/room`).then(response=>{
					setRoomList(response.data.rooms);
					setExitList(response.data.exits);
				});
				setMode(-1);
			}
			else
				alert(response.data.message);
		});
	}
	return (
		<Grid className="adminscreenroom">
			<Header />
			<Grid className="body">
				<Table className="table">
					<TableHead>
						<TableCell align="center">상영관 번호</TableCell>
						<TableCell align="center">상영관 이름</TableCell>
						<TableCell align="center">행</TableCell>
						<TableCell align="center">열</TableCell>
						<TableCell align="center">총 좌석 수</TableCell>
						<TableCell align="center">비상구위치</TableCell>
						<TableCell align="center"><Button color="inherit" onClick={handlerAdd}>추가</Button></TableCell>
					</TableHead>

					<TableBody>
						{
							roomList.map((data)=>{
								if(data.ROOM_NUM===mode){
									return(
									<TableRow>
										<TableCell align="center" style={{width:'10%'}}>{data.ROOM_NUM}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>{data.ROOM_NAME}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>
											<TextField value={data.ROW_NUM} onChange={(e)=>setRow(e.target.value)} />
										</TableCell>
										<TableCell align="center" style={{width:'15%'}}>
											<TextField value={data.COL_NUM} onChange={(e)=>setCol(e.target.value)} />	
										</TableCell>
										<TableCell align="center" style={{width:'15%'}}>
											<TextField value={data.TOTAL_SEAT_CAP}/>
										</TableCell>
										<TableCell align="center" style={{width:'15%'}}>
											{/* <TextField value={exit} onChange={(e)=>setExit(e.target.value)} /> */}
											{/* <Autocomplete
												multiple
												id="tags-standard"
												options={exitCodeList}
												getOptionLabel={(option) => option.CODE_NAME}
												// defaultValue={exitCodeList.map(exit => exit.CODE_NAME)[0]}
												renderInput={(params) => {
													console.log(params);
												return (<TextField
													{...params}
													variant="standard"
													placeholder="비상구 위치"
												/>
												)}}
												
											/> */}
										</TableCell>
										<TableCell align="center" style={{width:'20%'}}>
											<Grid className="btn-con">
												<Button color="inherit" onClick={()=>handlerMode(data.ROOM_NUM)}>완료</Button>
												<Button color="inherit" onClick={()=>handlerMode(data.ROOM_NUM)}>취소</Button>
											</Grid>
										</TableCell>
								</TableRow>)
								}
								else{
									return(
									<TableRow>
										<TableCell align="center" style={{width:'10%'}}>{data.ROOM_NUM}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>{data.ROOM_NAME}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>{data.ROW_NUM}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>{data.COL_NUM}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>{data.TOTAL_SEAT_CAP}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>
											{exitList.length > 0 && exitCodeList.length > 0?
											exitList.filter(exit => exit.ROOM_NUM == data.ROOM_NUM).map(exit => exitCodeList.filter(code => code.COMMON_CODE == exit.EMC_LOC_CODE)[0].CODE_NAME).map(exit => <p>{exit}</p>)
											:null}
										</TableCell>
										<TableCell align="center" style={{width:'20%'}}>
											<Grid className="btn-con">
												<Button color="inherit" onClick={()=>handlerMode(data.ROOM_NUM)}>수정</Button>
												<Button color="inherit" onClick={()=>onClickDelete(data.ROOM_NUM)}>삭제</Button>
											</Grid>
										</TableCell>
								</TableRow>)
								}
							})
						}
						{
							mode===0?
							<TableRow>
								<TableCell align="center" style={{width:'10%'}}>
								
								</TableCell>
								<TableCell align="center" style={{width:'15%'}}>
								<TextField name="ROOM_NAME" value={newData.ROOM_NAME} onChange={updateField} />
								</TableCell>
								<TableCell align="center" style={{width:'15%'}}>
									<TextField name="ROW_NUM" value={newData.ROW_NUM} onChange={updateField} />
								</TableCell>
								<TableCell align="center" style={{width:'15%'}}>
									<TextField name="COL_NUM" value={newData.COL_NUM} onChange={updateField} />	
								</TableCell>
								<TableCell align="center" style={{width:'15%'}}>
									{newData.ROW_NUM*newData.COL_NUM}
								</TableCell>
								<TableCell align="center" style={{width:'15%'}}>
									{/* <TextField value={exit} onChange={(e)=>setExit(e.target.value)} /> */}
									{/* <Autocomplete
										multiple
										id="tags-standard"
										options={exitCodeList}
										getOptionLabel={(option) => option.CODE_NAME}
										// defaultValue={exitCodeList.map(exit => exit.CODE_NAME)[0]}
										renderInput={(params) => {
											//console.log(params.InputProps.startAdornment.map(element => element.props.label));
											if (params.InputProps.startAdornment !== undefined){
												const exits = params.InputProps.startAdornment.length > 0 ?params.InputProps.startAdornment.map(element => element.props.label):null;
												setNewData({...newData, exits: exits});
											}
											
										return (<TextField
											{...params}
											variant="standard"
											placeholder="비상구 위치"
										/>
										)}}	
									/> */}
								</TableCell>
								<TableCell align="center" style={{width:'20%'}}>
									<Grid className="btn-con">
										<Button color="inherit" onClick={onClickAdd}>등록</Button>
										<Button color="inherit" onClick={()=>handlerMode(0)}>취소</Button>
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

export default Admin_screenroom
