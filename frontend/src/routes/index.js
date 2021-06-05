import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
	Main,
	Login, 
	Register,
	NowScreen,
	MovieDetail,
	Reserve,
  CreateMovie
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
        {/* 관리자용 PAGES  */}
				<Route exact path="/createmovie" component={CreateMovie} />
			</Switch>
		</BrowserRouter>
	)
}

export default Router
