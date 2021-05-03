import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Main, Login, Register } from '../pages';
import '../css/main.scss';
import { Header } from '../components';

function Router() {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
			</Switch>
		</BrowserRouter>
	)
}

export default Router
