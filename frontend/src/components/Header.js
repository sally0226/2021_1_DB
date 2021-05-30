import React, { useState } from 'react'
import { Grid, Link } from '@material-ui/core';

export default function Header() {
	const subnavDefalut = [["예매하기", "상영시간표"],["홈", "현재상영작", "상영예정작"]];
	const subnavManager = [["영화 등록", "영화 조회/편집"], ["직원 등록", "직원 조회/편집"],["상영관 관리"],["상영일정 등록", "상영일정 조회/편집"], ["출입 명부"]];
	const [idx, setIdx] = useState(0);
	const idxHandler = (i) => {
		setIdx(i);
	}
	const isManager = true;
	if (isManager) {
		return (
			<Grid className="header">
				<Grid className="header-main">
					<Grid className="h-title">
						<Link href="/" style={{ textDecoration: 'none' }} color="inherit">시DB</Link>
					</Grid>
					<Grid className="h-button">
						<Link href="/login" style={{marginRight:'1rem'}} color="inherit">로그인</Link>
						<Link href="/register" color="inherit">회원가입</Link>
					</Grid>
				</Grid>
				<Grid className="header-sub">
					<Grid className="sub-btn-con">
						<div />
						<div className="sub-btn" onMouseOver={()=>idxHandler(0)}>영화 관리</div>
						<div className="sub-btn" onMouseOver={()=>idxHandler(1)}>직원 관리</div>
						<div className="sub-btn" onMouseOver={()=>idxHandler(2)}>상영관 관리</div>
						<div className="sub-btn" onMouseOver={()=>idxHandler(3)}>상영일정 관리</div>
						<div className="sub-btn" onMouseOver={()=>idxHandler(4)}>코로나 출입 명부 관리</div>
						<div />
					</Grid>
					<Grid className="sub-navigation">
						{
							subnavManager[idx].map((name, index) =>
								<Link className="sub-nav-btn" color="inherit" style={{ textDecoration: 'none'}}>{name}</Link>
							)
						}
					</Grid>
				</Grid>
			</Grid>
		)
	} 
	else {
		return (
			<Grid className="header">
				<Grid className="header-main">
					<Grid className="h-title">
						<Link href="/" style={{ textDecoration: 'none' }} color="inherit">시DB</Link>
					</Grid>
					<Grid className="h-button">
						<Link href="/login" style={{marginRight:'1rem'}} color="inherit">로그인</Link>
						<Link href="/register" color="inherit">회원가입</Link>
					</Grid>
				</Grid>
				<Grid className="header-sub">
					<Grid className="sub-btn-con">
						<div />
						<div className="sub-btn" onMouseOver={()=>idxHandler(0)}>예매</div>
						<div className="sub-btn" onMouseOver={()=>idxHandler(1)}>영화</div>
						<div />
					</Grid>
					<Grid className="sub-navigation">
						{
							subnavDefalut[idx].map((name, index) =>
								<Link className="sub-nav-btn" color="inherit" style={{ textDecoration: 'none'}}>{name}</Link>
							)
						}
					</Grid>
				</Grid>
			</Grid>
		)
	}
}