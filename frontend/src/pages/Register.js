import React, { useState } from 'react'
import { Header } from '../components';
import { Grid, TextField, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { CSSTransition } from 'react-transition-group';


function Register() {
	// <-- check button
	const [checked, setChecked] = useState(false);
	const checkHandler = (e) => {
		setChecked(e.target.checked);
	}
	// check button -->

	// <-- input
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [id, setId] = useState("");
	const [pw, setPw] = useState("");
	const [key, setKey] = useState("");
	const [reg, setReg] = useState("");

	const SubmitHandler = (event) => {
		alert(`name : ${name} \n phone: ${phone} \n id: ${id} \n pw: ${pw} \n key: ${key}`);
		event.preventDefault();
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
					<FormControlLabel
        				control={
							<Checkbox
								checked={checked}
								onChange={checkHandler}
								style={{ color:'#ffffff' }}
							/>
						}
        				label="Are you Admin?"
						style={{ color: '#ffffff'}}
      				/>
					<CSSTransition
						in={checked}
						timeout={300}
						classNames="adminInput"
						unmountOnExit
					>
						<TextField
							variant="filled"
							margin="normal"
							fullWidth
							placeholder="Admin Key"
							autoFocus
							style={{
								backgroundColor: '#ffffff'
							}}
							value={key}
							onChange={(e)=>setKey(e.target.value)}
						/>
					</CSSTransition>
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
