import React, { useState } from 'react'
import axios from 'axios'
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
	const [reg2, setReg2] = useState("");
	const [birth, setBirth] = useState("")

	const SubmitHandler = (event) => {
		event.preventDefault();
		let body = {
			name: name,
			phone: phone,
			id: id,
			password: pw,
			regnum: reg+reg2,
			birth: birth,
		}
		console.log(body);
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
						placeholder="이름"
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
						placeholder="전화번호(숫자만)"
						required
						autoFocus
						style={{
							backgroundColor: '#ffffff'
						}}
						inputProps={{ maxLength: 11 }}
						value={phone || ''}
						onChange={(e)=>setPhone(e.target.value)}
					/>
					<TextField
						variant="filled"
						margin="normal"
						fullWidth
						placeholder="아이디"
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
						placeholder="비밀번호"
						type="password"
						required
						autoFocus
						style={{
							backgroundColor: '#ffffff'
						}}
						value={pw}
						onChange={(e)=>setPw(e.target.value)}
					/>
					<Grid style={{display:'flex', flexDierction:'row', alignItems:'center'}}>
						<TextField
							variant="filled"
							margin="normal"
							fullWidth
							placeholder="주민등록번호"
							inputProps={{ maxLength: 6 }}
							required
							autoFocus
							style={{
								backgroundColor: '#ffffff'
							}}
							value={reg}
							onChange={(e)=>setReg(e.target.value)}
						/>
						<p style={{padding:'0 5px', color:'white'}}>-</p>
						<TextField
							variant="filled"
							margin="normal"
							fullWidth
							type="password"
							inputProps={{ maxLength: 7 }}
							required
							autoFocus
							style={{
								backgroundColor: '#ffffff'
							}}
							value={reg2}
							onChange={(e)=>setReg2(e.target.value)}
						/>
					</Grid>
					<TextField
						variant="filled"
						margin="normal"
						fullWidth
						placeholder="생일 8자리"
						required
						autoFocus
						inputProps={{ maxLength: 8 }}
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
