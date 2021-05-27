import React, { useState } from 'react'
import { Grid, Link } from '@material-ui/core';

export default function Header() {
	// 작은 메뉴
	const subNav = [["예매하기", "상영시간표"],["현재상영작", "상영예정작"]];
	const subLink = [["/", "/"],["nowscreen", "/"]];
	const [subHref, setSubHref] = useState([]);

	// hover 효과 idx(큰 메뉴의 idx)
	const [idx, setIdx] = useState(0);
	const idxHandler = (i) => {
		setIdx(i);
		setSubHref(subLink[i]);
	}

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
						subNav[idx].map((name, index) =>
							<Link
								href={subHref[index]}
								className="sub-nav-btn"
								color="inherit"
								style={{ textDecoration: 'none'}}
							>
								{name}
							</Link>
						)
					}
				</Grid>
			</Grid>
		</Grid>
	)
}