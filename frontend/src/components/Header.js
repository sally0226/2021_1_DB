import React, { useState } from 'react'
import { Grid, Link } from '@material-ui/core';

export default function Header() {
	const subnav = [["예매하기", "상영시간표"],["홈", "현재상영작", "상영예정작"]];
	const [idx, setIdx] = useState(0);
	const idxHandler = (i) => {
		setIdx(i);
	}
	return (
		<Grid className="header">
			<Grid className="header-main">
				<Grid className="h-title">
					<Link href="/" style={{ textDecoration: 'none' }}>시DB</Link>
				</Grid>
				<Grid className="h-button">
					<Link href="/login" style={{marginRight:'1rem'}}>로그인</Link>
					<Link href="/register">회원가입</Link>
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
						subnav[idx].map((name, index) =>
							<Link className="sub-nav-btn">{name}</Link>
						)
					}
				</Grid>
			</Grid>
		</Grid>
	)
}