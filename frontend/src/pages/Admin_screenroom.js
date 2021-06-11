import React, { useState } from 'react'

import { Grid, Table, TableCell, TableHead, TableRow, TableBody, Button, TextField } from '@material-ui/core'
import DatePicker from "react-datepicker";
import { Header } from '../components'

function Admin_screenroom() {
	const [temp, setTemp] = useState([{
		id: 1,
		row: 3,
		col: 30,
		sum: 90,
		exit: 2,
	},{
		id: 2,
		row: 3,
		col: 10,
		sum: 30,
		exit: 1,
	}]);

	const [mode, setMode] = useState(-1); // -1 : list, 0: add

	const [id, setId] = useState(0);
	const [row, setRow] = useState(0);
	const [col, setCol] = useState(0);
	const [sum, setSum] = useState(0);
	const [exit, setExit] = useState(0);

	const handlerMode = (id) => {
		if(id===mode) setMode(-1);
		else setMode(id);
		setId(temp[id-1].id);
		setRow(temp[id-1].row);
		setCol(temp[id-1].col);
		setSum(temp[id-1].sum);
		setExit(temp[id-1].exit);
	}

	const handlerAdd = () => {
		setMode(0);
		setId(0);
		setRow(0);
		setCol(0);
		setSum(0);
		setExit(0);
	}
	
	return (
		<Grid className="adminscreenroom">
			<Header />
			<Grid className="body">
				<Table className="table">
					<TableHead>
						<TableCell align="center">상영관 번호</TableCell>
						<TableCell align="center">행</TableCell>
						<TableCell align="center">열</TableCell>
						<TableCell align="center">총 좌석 수</TableCell>
						<TableCell align="center">비상구위치</TableCell>
						<TableCell align="center"><Button color="inherit" onClick={handlerAdd}>추가</Button></TableCell>
					</TableHead>

					<TableBody>
						{
							temp.map((data)=>{
								if(data.id===mode){
									return(
									<TableRow>
										<TableCell align="center" style={{width:'15%'}}>
											<TextField value={id} onChange={(e)=>setId(e.target.value)} />
										</TableCell>
										<TableCell align="center" style={{width:'15%'}}>
											<TextField value={row} onChange={(e)=>setRow(e.target.value)} />
										</TableCell>
										<TableCell align="center" style={{width:'15%'}}>
											<TextField value={col} onChange={(e)=>setCol(e.target.value)} />	
										</TableCell>
										<TableCell align="center" style={{width:'15%'}}>
											<TextField value={sum} onChange={(e)=>setSum(e.target.value)} />
										</TableCell>
										{/* exit 나중에 picker로 바꾸기. 여러개의 exit도... */}
										<TableCell align="center" style={{width:'15%'}}>
											<TextField value={exit} onChange={(e)=>setExit(e.target.value)} />
										</TableCell>
										<TableCell align="center" style={{width:'20%'}}>
											<Grid className="btn-con">
												<Button color="inherit" onClick={()=>handlerMode(data.id)}>등록</Button>
												<Button color="inherit">삭제</Button>
											</Grid>
										</TableCell>
								</TableRow>)
								}
								else{
									return(
									<TableRow>
										<TableCell align="center" style={{width:'15%'}}>{data.id}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>{data.row}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>{data.col}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>{data.sum}</TableCell>
										<TableCell align="center" style={{width:'15%'}}>{data.exit}</TableCell>
										<TableCell align="center" style={{width:'20%'}}>
											<Grid className="btn-con">
												<Button color="inherit" onClick={()=>handlerMode(data.id)}>수정</Button>
												<Button color="inherit">삭제</Button>
											</Grid>
										</TableCell>
								</TableRow>)
								}
							})
						}
						{
							mode===0?
							<TableRow>
								<TableCell align="center" style={{width:'15%'}}>
									<TextField value={id} onChange={(e)=>setId(e.target.value)} />
								</TableCell>
								<TableCell align="center" style={{width:'15%'}}>
									<TextField value={row} onChange={(e)=>setRow(e.target.value)} />
								</TableCell>
								<TableCell align="center" style={{width:'15%'}}>
									<TextField value={col} onChange={(e)=>setCol(e.target.value)} />	
								</TableCell>
								<TableCell align="center" style={{width:'15%'}}>
									<TextField value={sum} onChange={(e)=>setSum(e.target.value)} />
								</TableCell>
								{/* exit 나중에 picker로 바꾸기. 여러개의 exit도... */}
								<TableCell align="center" style={{width:'15%'}}>
									<TextField value={exit} onChange={(e)=>setExit(e.target.value)} />
								</TableCell>
								<TableCell align="center" style={{width:'20%'}}>
									<Grid className="btn-con">
										<Button color="inherit">등록</Button>
										<Button color="inherit">삭제</Button>
									</Grid>
								</TableCell>
							</TableRow>
							:null
						}
					</TableBody>
				</Table>
			</Grid>
		</Grid>
	)
}

export default Admin_screenroom
