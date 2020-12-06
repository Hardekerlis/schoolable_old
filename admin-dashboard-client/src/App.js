/** @format */

import './App.css';

import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

import { UserList } from './components/index';

// import { Trying } from './components/index';
// <Trying bool='true' />

const App = () => {
	return (
		<Admin dataProvider={ dataProvider }>
			<Resource name='users' list={ UserList } />
		</Admin>
	);
};

export default App;
