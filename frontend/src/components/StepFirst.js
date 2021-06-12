import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@material-ui/core';

function StepFirst({ next, prev }) {
	const seatRow = 10;
	const seatCol = 20;
	var seatsData = [[{
		id: 'A1',
		status: 0,
		rating: 0
	},{
		id: 'A2',
			status: 1,
			rating: 0
	},{
		id: 'A3',
			status: 0,
			rating: 0
	},{
		id: 'A4',
			status: 0,
			rating: 0
	},{
		id: 'A5',
			status: 0,
			rating: 0
	}],[{
		id: 'B1',
		status: 0,
		rating: 1
	},{
		id: 'B2',
		status: 0,
		rating: 1
	},{
		id: 'B3',
		status: 0,
		rating: 1
	},{
		id: 'B4',
		status: 0,
		rating: 1
	},{
		id: 'B5',
		status: 0,
		rating: 1
	}]];
	const arr = Array.from(Array(seatRow), () => Array(seatCol).fill(false))
	const [selectInfo, setSelectInfo] = useState({"arr": arr});

	// useEffect(() => {}, [selectInfo]);
	console.log(selectInfo);
	function handelClick(e){
		const c = e.target.getAttribute('c');
		const r = e.target.getAttribute('r');
		console.log("clicked");
		const newState = selectInfo.arr;
		// console.log(r +" " +c);
		// console.log(newState[0]);
		newState[r][c] = !newState[r][c];
		setSelectInfo({arr: newState});
		console.log(selectInfo);
		
	}
	function Seat(props) {
		if (selectInfo.arr[props.r][props.c] == true) {
			return (
				<div className="selected-seat"
					id={props.id}
					r={props.r}
					c={props.c}
					onClick={handelClick}>
				</div>
			)
		}
		else {
			return (
				<div className="seat"
					id={props.id}
					r={props.r}
					c={props.c}
					onClick={handelClick}>
				</div>
			)
		}	
	}
	
	
	return (
		<Grid className="stepFirst">
			<Grid className="label">
			<Button	onClick={next}>next</Button>
			</Grid>
			<Grid className="map">
				<Grid className="screen">S C R E E N</Grid>
				<Grid className="seats">
					{[...Array(seatRow)].map((r, indexR) => (
						<Grid className="seat-row" id={indexR}>
							{[...Array(seatCol)].map((c, indexC) => (
								<Seat isSelected={0} r={indexR} c={indexC}/>
							))}
						</Grid>
					))}
					
				</Grid>
			</Grid>
		</Grid>
	)
}

export default StepFirst
