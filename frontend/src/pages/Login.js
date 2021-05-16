import React, { useState } from 'react';
import { Header } from '../components';
import { Grid, Tabs, Tab, TextField, Button, withStyles, makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
	input: {
		color: "#000000",
	  }
}));

function Login() {
	const classes = styles();
	const [tabValue, setTabValue] = useState(0);
	const [id, setId] = useState("");

	const handleChange = (event, newValue) => {
		setTabValue(newValue);
	  };
	
	const handleSubmit = (event) => {
		alert('A name was submitted: ' + id);
		event.preventDefault();
	  }
	return (
		<Grid className="login">
			<Header />
			<Grid className="content-body">
				<Grid className="tab">
					<Tabs
						value={tabValue}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						centered
						TabIndicatorProps={{
							style: {
							  height:"5px",
							}
						  }}
					>
						<Tab label={<span className="tabLabel">회원</span>} />
						<Tab label={<span className="tabLabel">비회원</span>} />
					</Tabs>
					{
						tabValue === 0 ?
						<Grid className="tab-content">
							<Grid item className="input" xs={9}>
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
									type="password"
									margin="normal"
									fullWidth
									placeholder="PassWord"
									autoFocus
									style={{
										backgroundColor: '#ffffff'
									}}
									InputProps={{
										className: classes.input
									}}
								/>
							</Grid>
							<Grid item className="submit-grid" xs={3}>
								<Button 
									variant="contained"
									style={{
										width: '100%',
										height: '100%',
										backgroundColor: '#DA8181',
										borderRadius: 0
									}}
								>
									Login
								</Button>
							</Grid>
						</Grid>
						:
						<Grid className="tab-content">비회원</Grid>
					}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Login
