/** @format */

import React from 'react';

import { Input } from '../../components/Input/Input.js';

import './Login.css';

export const Login = () => {
	return (
		<div className='loginContainer'>
			<div className='loginArea'>
				<form id='loginForm'>
					<Input id='username' label='Username' type='text' />
				</form>
			</div>
		</div>
	);
};
