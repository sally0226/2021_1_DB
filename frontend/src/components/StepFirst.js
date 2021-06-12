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
	const [selectCount, setSelectCount] = useState(0);
	// useEffect(() => {}, [selectInfo]);
	console.log(selectInfo);
	function handelClick(e){
		const c = e.target.getAttribute('c');
		const r = e.target.getAttribute('r');
		console.log("clicked");
		const newState = selectInfo.arr;
		// console.log(r +" " +c);
		// console.log(newState[0]);
		if (newState[r][c])
			setSelectCount(selectCount - 1);
		else 
			setSelectCount(selectCount + 1);
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
				{props.c}
				</div>
			);
		}
		else {
			return (
				<div className="seat"
					id={props.id}
					r={props.r}
					c={props.c}
					onClick={handelClick}>
				{props.c}
				</div>
			);
		}	
	}
	
	
	return (
		<Grid className="stepFirst">
			<Grid className="label">
				{/* 상영일정 정보 담기 */}
			</Grid>
			<Grid className="map">
				<Grid className="screen">S C R E E N</Grid>
				<Grid className="seats">
					{[...Array(seatRow)].map((r, indexR) => (
						<Grid className="seat-row" id={indexR}>
							{[...Array(seatCol)].map((c, indexC) => (
								<Seat r={indexR} c={indexC}/>
							))}
						</Grid>
					))}
					
				</Grid>
			</Grid>
			<Grid className="info">
				<div>선택된 좌석 {selectCount}개</div>
				<div>총 금액 {1000}원</div>
				<div className="btn-wrapper">
					<Button className="btn" onClick={next}>
						결제하기
					</Button>
				</div>
				
			</Grid>
		</Grid>
	)
}

export default StepFirst
