import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { Grid, TextField, Button, Link, Select, MenuItem } from '@material-ui/core'
import { API_URL } from '../CommonVariable';

function Enter() {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [room, setRoom] = useState([]);
	const [selectRoom, setSelectRoom] = useState();

	useEffect(()=>{
		//상영관 리스트 받아오기 
		axios.get(`${API_URL}/room`).then(response=>{
			const rooms = response.data;
			setRoom(rooms);
			setSelectRoom(rooms[0]);
			console.log(room);
			console.log(selectRoom);
		});
	},[]);

	const SubmitHandler = (event) => {
		event.preventDefault();
		let body = {
			name: name,
			contact: phone,
			room: selectRoom
		}
		axios.post(`${API_URL}/enter`, body)
		.then(response=>{
			console.log(response);
			if(!response.data.success){
				alert(`출입명부 작성에 실패하셨습니다!`);
			}
			else{
				alert(response.data.message);
				window.location.href='/';
			}
		})
	};

	return (
		<Grid className="enter">
			<p style={{textAlign:"center", margin:'4rem 0', color:'white', fontSize:'3rem'}}>출입명부작성</p>
			<Grid item className="temp-input">
				<TextField
					variant="filled"
					margin="normal"
					fullWidth
					placeholder="Name"
					autoFocus
					style={{
						backgroundColor: '#ffffff'
					}}
					value={name}
					onChange={(e)=>setName(e.target.value)}
				/>
				<TextField
					variant="filled"
					margin="normal"
					fullWidth
					placeholder="000-0000-0000"
					autoFocus
					style={{
						backgroundColor: '#ffffff', marginBottom: '1rem'
					}}
					inputProps={{maxLength:13}}
					value={phone}
					onChange={(e)=>setPhone(e.target.value)}
				/>
				<Select
					variant="filled"
					margin="normal"
					required
					autoFocus
					fullWidth
					value={selectRoom}
					onChange={e => setSelectRoom(e.target.value)}
				>
					{room.map((room) => (
						<MenuItem value={room.ROOM_NUM}>
							{room.ROOM_NAME}
						</MenuItem>
					))}
				</Select>
				<Button 
					variant="contained"
					style={{
						width: '100%',
						height: '3rem',
						backgroundColor: '#DA8181',
						borderRadius: 0,
						padding: '10px 0',
						marginTop: '1rem'
					}}
					onClick={SubmitHandler}
				>
					출입명부 제출
				</Button>
				<Button 
					variant="contained"
					style={{
						width: '100%',
						height: '3rem',
						borderRadius: 0,
						padding: '10px 0',
						marginTop: '1rem',
						backgroundColor:'#cacaca',
						textDecoration:'none'
					}}
					component={Link}
					href="/"
				>
					취소하기
				</Button>
			</Grid>
		</Grid>
	)
}

export default Enter
