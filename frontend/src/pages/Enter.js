import React, { useState } from 'react'

import { Grid, TextField, Button, Link } from '@material-ui/core'

function Enter() {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [room, setRoom] = useState();

	const SubmitHandler = (event) => {
		alert('A name was submitted: ' + name + 'pw : ' + phone);
		event.preventDefault();
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
					placeholder="Phone Number"
					autoFocus
					style={{
						backgroundColor: '#ffffff'
					}}
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
