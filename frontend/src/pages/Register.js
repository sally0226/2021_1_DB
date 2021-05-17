import React from 'react'
import { Header } from '../components';
import { Grid, TextField, makeStyles, Button } from '@material-ui/core';

const styles = makeStyles((theme) => ({
	input: {
		color: "#000000",
	  }
}));

function Register() {
	const classes = styles();
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
						autoFocus
						style={{
							backgroundColor: '#ffffff',
						}}
						InputProps={{
						className: classes.input
						}}
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
						InputProps={{
						className: classes.input
						}}
					/>
					<TextField
						variant="filled"
						margin="normal"
						fullWidth
						placeholder="ID"
						autoFocus
						style={{
							backgroundColor: '#ffffff'
						}}
						InputProps={{
						className: classes.input
						}}
					/>
					<TextField
						variant="filled"
						margin="normal"
						fullWidth
						placeholder="Password"
						autoFocus
						style={{
							backgroundColor: '#ffffff'
						}}
						InputProps={{
						className: classes.input
						}}
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
					>
						Register
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Register
