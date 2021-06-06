import React, { useState } from 'react'
import { Grid, Link } from '@material-ui/core';
import { useLocalStorage } from '.';


export default function Header() {
	const [isManager, setIsManager] = useLocalStorage("isManager", false);
	const [subHref, setSubHref] = useState([]); // 링크를 담는 state
	
	// 작은 메뉴
	const subNavDefault = [["예매하기", "상영시간표"],["현재상영작", "상영예정작"]];
	const subLinkDefault = [["/reserve", "/"],["/moviescreen/now", "/moviescreen/will"]];

	const subnavManager = [["영화 등록", "영화 조회/편집"], ["직원 등록", "직원 조회/편집"],["상영관 관리"],["상영일정 등록", "상영일정 조회/편집"], ["출입 명부"]];
	const subLinkManager = [["/createmovie", "/"],["/createemployee", "/"],["/"],["/","/"],["/"]];
	
	// hover 효과 idx(큰 메뉴의 idx)
	const [idx, setIdx] = useState(0);
	const idxHandler = (i) => {
		setIdx(i);
		isManager? setSubHref(subLinkManager[i])
		: setSubHref(subLinkDefault[i]);
	};

	const modeHandler = () => {
		setIsManager(!isManager);
	};

	if (isManager) {
		return (
			<Grid className="header">
				<Grid className="header-main">
					<Grid className="h-title">
						<Link href="/" style={{ textDecoration: 'none' }} color="inherit">시DB</Link>
					</Grid>
					<Grid className="h-button">
						<Link />
						<Link />
						{/* 왠지 모르겠는데 위에 두개 없으면 자꾸 login, register페이지로감 */}
						<Link href="/" color="inherit" style={{cursor:'pointer'}} onClick={modeHandler}>회원메뉴</Link>
					</Grid>
				</Grid>
				<Grid className="header-sub">
					<Grid className="sub-btn-con">
						<div className="sub-btn" onMouseOver={()=>idxHandler(0)}>영화 관리</div>
						<div className="sub-btn" onMouseOver={()=>idxHandler(1)}>직원 관리</div>
						<div className="sub-btn" onMouseOver={()=>idxHandler(2)}>상영관 관리</div>
						<div className="sub-btn" onMouseOver={()=>idxHandler(3)}>상영일정 관리</div>
						<div className="sub-btn" onMouseOver={()=>idxHandler(4)}>코로나 출입 명부 관리</div>
					</Grid>
					<Grid className="sub-navigation">
						{
							subnavManager[idx].map((name, index) =>
								<Link
									href={subHref[index]}
									className="sub-nav-btn"
									color="inherit"
									style={{ textDecoration: 'none'}}
									key={index}
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
	else {
		return (
			<Grid className="header">
				<Grid className="header-main">
					<Grid className="h-title">
						<Link href="/" style={{ textDecoration: 'none' }} color="inherit">시DB</Link>
					</Grid>
					<Grid className="h-button">
						<Link href="/login" style={{marginRight:'1rem'}} color="inherit">로그인</Link>
						<Link href="/register" style={{marginRight:'1rem'}} color="inherit">회원가입</Link>
						<Link href="/" color="inherit" onClick={modeHandler}>관리자</Link>
					{/* 추후 login기능으로 관리자 페이지 접속할 수 있게 하기 */}
					</Grid>
				</Grid>
				<Grid className="header-sub">
					<Grid className="sub-btn-con">
						<div className="sub-btn" onMouseOver={()=>idxHandler(0)}>예매</div>
						<div className="sub-btn" onMouseOver={()=>idxHandler(1)}>영화</div>
					</Grid>
					<Grid className="sub-navigation">
						{
							subNavDefault[idx] && subNavDefault[idx].map((name, index) =>
							<Link
								href={subHref[index]}
								className="sub-nav-btn"
								color="inherit"
								style={{ textDecoration: 'none'}}
								key={index}
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
}