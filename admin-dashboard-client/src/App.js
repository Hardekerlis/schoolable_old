/** @format */

import React from 'react';
// import { Admin } from 'react-admin';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Login } from './views';

import './App.css';

console.log(
	'Go to https://github.com/Hardekerlis/reactAdminExample for reference',
);
function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' name='login' component={ Login } />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
