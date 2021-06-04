import React, { useState } from 'react'
import { Grid, TextField, makeStyles, Button } from '@material-ui/core';

const styles = makeStyles((theme) => ({
	input: {
		color: "#000000",
	  }
}));

function CustomerInput() {
	const classes = styles();

	// <-- check button
	const [checked, setChecked] = useState(false);
	const checkHandler = (e) => {
		setChecked(e.target.checked);
	}
	// check button -->

	// <-- input
	const [name, setName] = useState("");
	const [phone, setPhone] = useState();
	const [reg, setReg] = useState("");

	const SubmitHandler = (event) => {
		alert(`name : ${name} \n phone: ${phone} \n 주민: ${reg}`);
		event.preventDefault();
	}
	// input -->
	return (
		<Grid className="customerInput">
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
						InputProps={{
						className: classes.input
						}}
						value={name}
						onChange={(e)=>setName(e.target.value)}
					/>
					<TextField
						variant="filled"
						margin="normal"
						fullWidth
						placeholder="Phone Number"
						type="number"
						required
						autoFocus
						style={{
							backgroundColor: '#ffffff'
						}}
						InputProps={{
						className: classes.input
						}}
						value={phone || ''}
						onChange={(e)=>setPhone(e.target.value)}
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
						InputProps={{
						className: classes.input
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
						Submit
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default CustomerInput
