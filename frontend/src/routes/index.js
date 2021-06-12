import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
	Main,
	Login, 
	Register,
	NowScreen,
	MovieDetail,
	Reserve,
  	CreateMovie,
	ModifyMovie,
	CreateEMP,
	AdminMovieList,
	AdminEnterList,
	Enter,
	AdminEMPList,
	ModifyEMP,
	MovieSchedule,
} from '../pages';
import '../css/main.scss';

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/moviescreen/:status" component={NowScreen} />
				<Route exact path="/movie/:movieId" component={MovieDetail} />
				<Route exact path="/reserve" component={Reserve} />
				<Route exact path="/enterroom" component={Enter} />
				<Route exact path="/movieschedule" component={MovieSchedule} />
        		{/* 관리자용 PAGES  */}
				<Route exact path="/createmovie" component={CreateMovie} />
				<Route exact path="/modifymovie/:movieid" component={ModifyMovie} />
				<Route exact path="/createemployee" component={CreateEMP} />
				<Route exact path="/adminmovielist" component={AdminMovieList}/>
				<Route exact path="/adminenterlist" component={AdminEnterList}/>
				<Route exact path="/adminemplist" component={AdminEMPList}/>
				<Route exact path="/modifyemp/:empid" component={ModifyEMP}/>
			</Switch>
		</BrowserRouter>
	)
}

export default Router
