import React, { useState } from 'react'
import axios from 'axios';

import { Grid, TextField, Button, Link } from '@material-ui/core'
import { API_URL } from '../CommonVariable';

function Enter() {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [room, setRoom] = useState();

	const SubmitHandler = (event) => {
		event.preventDefault();
		let body = {
			name: name,
			contact: phone,
			room: room
		}
		axios.post(`${API_URL}/enter`, body)
		.then(response=>{
			if(!response.data.success){
				alert(`출입명부 작성에 실패하셨습니다!`);
			}
			else{
				alert('출입명부작성에 성공하셨습니다.');
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
						backgroundColor: '#ffffff'
					}}
					inputProps={{maxLength:13}}
					value={phone}
					onChange={(e)=>setPhone(e.target.value)}
				/>
				<TextField
					variant="filled"
					margin="normal"
					fullWidth
					placeholder="상영관(숫자)"
					type="number"
					autoFocus
					style={{
						backgroundColor: '#ffffff'
					}}
					value={room || ''}
					onChange={(e)=>setRoom(e.target.value)}
				/>
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
