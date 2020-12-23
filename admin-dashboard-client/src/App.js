/** @format */

import React from 'react';
import {
	BrowserRouter,
	Route,
	Redirect,
	Switch,
	useHistory,
	useLocation,
} from 'react-router-dom';

// import buildClient from '../api/build-client';

import { Dashboard, Login } from './views';

import './App.css';

console.log(
	'Go to https://github.com/Hardekerlis/reactAdminExample for reference',
);

const PrivateRoute = () => {};

const LoginPage = () => {
	let history = useHistory();
	let location = useLocation();
};

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' name='Login' component={ Login } />
			</Switch>
		</BrowserRouter>
	);
}
// <Route path='/' name='Dashboard' component={ Dashboard } />

export default App;
