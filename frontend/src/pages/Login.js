import React, { useState } from 'react'
import axios from 'axios'
import { Header } from '../components';
import { Grid, Tabs, Tab, TextField, Button } from '@material-ui/core';
import { API_URL } from '../CommonVariable';


function Login() {
	// <-- tab state
	const [tabValue, setTabValue] = useState(0);
	const tabHandler = (event, newValue) => {
		setTabValue(newValue);
	};
	// tab state -->

	// <-- input
	const [id, setId] = useState(""); // 비회원시 이름
	const [pw, setPw] = useState(""); // 비회원시 비밀번호
	const [phone, setPhone] = useState(""); // 비회원시 필요한 폰
	
	const SubmitHandler = (event) => {
		event.preventDefault();
		if(tabValue==0){
			let body = {
				id: id,
				password: pw
			}
			axios.post(`${API_URL}/login`, body)
			.then(response=>{
				if(response.data.success){
					if(response.data.user[1].CS_CLASSIFY_CODE === 20003){
						alert('관리자님, 환영합니다.')
						sessionStorage.setItem("isManager", true);
						sessionStorage.setItem("forManager", true);
						window.location.href='/';
					}
					else{
						alert(`${response.data.user[0].MEM_ID}님 로그인 되었습니다!`);
						sessionStorage.setItem("isLogined", true);
						window.location.href='/';
					}
				}
				else
					alert(response.data.message);
			})
		}
		else{
			let body = {
				phone: phone,
				id: id,
				password: pw
			}
			axios.post(`${API_URL}/login`, body)
			.then(response=>{
				if(response.data.success)
					alert(`${response.data}님 가입을 축하드립니다!`);
				else
					alert(response.data.message);
			})
		}
	}
	// input -->

	return (
		<Grid className="login">
			<Header />
			<Grid className="content-body">
				<Grid className="tab">
					<Tabs
						value={tabValue}
						onChange={tabHandler}
						textColor="inherit"
						centered
						TabIndicatorProps={{
							style: {
							  height:"5px",
							}
						}}
						style={{ marginBottom: "1rem"}}
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
									value={id}
									onChange={(e)=>setId(e.target.value)}
								/>
								<TextField
									variant="filled"
									type="password"
									margin="normal"
									fullWidth
									placeholder="Password"
									autoFocus
									style={{
										backgroundColor: '#ffffff'
									}}
									value={pw}
									onChange={(e)=>setPw(e.target.value)}
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
									onClick={SubmitHandler}
								>
									Login
								</Button>
							</Grid>
						</Grid>
						:
						<Grid className="tab-content2">
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
									value={id}
									onChange={(e)=>setId(e.target.value)}
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
									value={phone || ''}
									onChange={(e)=>setPhone(e.target.value)}
								/>
								<TextField
									variant="filled"
									margin="normal"
									fullWidth
									placeholder="Reservation Number"
									type="number"
									autoFocus
									style={{
										backgroundColor: '#ffffff'
									}}
									value={pw}
									onChange={(e)=>setPw(e.target.value)}
								/>
							<Button 
								variant="contained"
								style={{
									width: '100%',
									height: '100%',
									backgroundColor: '#DA8181',
									borderRadius: 0,
									padding: '10px 0',
									marginTop: '1rem'
								}}
								onClick={SubmitHandler}
							>
								View Reservation
							</Button>
							</Grid>
						</Grid>
					}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Login
