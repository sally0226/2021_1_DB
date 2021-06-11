import React, { useState } from 'react';
import axios from 'axios';
import { Header } from '../components';
import { Grid, TextField, Button } from '@material-ui/core';
import { API_URL } from '../CommonVariable';


function Register() {

	// <-- input
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [id, setId] = useState("");
	const [pw, setPw] = useState("");
	const [reg, setReg] = useState("");
	const [birth, setBirth] = useState("")

	const SubmitHandler = (event) => {
		event.preventDefault();
		let body = {
			name: name,
			phone: phone,
			id: id,
			password: pw,
			regnum: reg,
			birth: birth,
		}
		axios.post(`${API_URL}/signup`, body)
		.then(response=>{
			if(response.data.success){
				alert(`${response.data.userId}님 가입을 축하드립니다!`);
				window.location.href='/';
			}
			else
				alert(response.data.message);
		})
	}
	// input -->
	return (
		<Grid className="register">
			<Header />
			<Grid className="content-body">
				<Grid className="input-grid">
					<TextField
						variant="filled"
						margin="normal"
						fullWidth
						placeholder="Name"
						required
						autoFocus
						style={{
							backgroundColor: '#ffffff',
						}}
						value={name}
						onChange={(e)=>setName(e.target.value)}
					/>
					<TextField
						variant="filled"
						margin="normal"
						fullWidth
						placeholder="Phone Number"
						required
						autoFocus
						style={{
							backgroundColor: '#ffffff'
						}}
						value={phone || ''}
						onChange={(e)=>setPhone(e.target.value)}
					/>
					<TextField
						variant="filled"
						margin="normal"
						fullWidth
						placeholder="ID"
						required
						autoFocus
						style={{
							backgroundColor: '#ffffff'
						}}
						value={id}
						onChange={(e)=>setId(e.target.value)}
					/>
					<TextField
						variant="filled"
						margin="normal"
						fullWidth
						placeholder="Password"
						type="password"
						required
						autoFocus
						style={{
							backgroundColor: '#ffffff'
						}}
						value={pw}
						onChange={(e)=>setPw(e.target.value)}
					/>
					<TextField
						variant="filled"
						margin="normal"
						fullWidth
						placeholder="register number"
						type="number"
						required
						autoFocus
						style={{
							backgroundColor: '#ffffff'
						}}
						value={reg}
						onChange={(e)=>setReg(e.target.value)}
					/>
					<TextField
						variant="filled"
						margin="normal"
						fullWidth
						placeholder="birthdate 8string"
						type="number"
						required
						autoFocus
						style={{
							backgroundColor: '#ffffff'
						}}
						value={birth}
						onChange={(e)=>setBirth(e.target.value)}
					/>
					<Button 
						variant="contained"
						style={{
							width: '100%',
							height: '100%',
							backgroundColor: '#DA8181',
							borderRadius: 0,
							padding: '10px 0',
							marginTop: '2.5rem'
						}}
						onClick={SubmitHandler}
					>
						Register
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Register
