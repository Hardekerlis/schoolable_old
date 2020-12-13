/** @format */

import React from 'react';

import { Input, Submit, FileInput } from '../../components/index';

import './Login.css';

const loginSubmit = event => {
	event.preventDefault();
	console.log('Submit');
};

/* Possible props:
 * - multiple, if you want to allow multiple files
 *
 */

export const Login = () => {
	return (
		<div className='loginContainer'>
			<div className='loginArea'>
				<form id='loginForm' onSubmit={ loginSubmit }>
					<FileInput
						placeholder='Drop key here or click to upload'
						type='file'
						id='RSAfile'
						multiple
					/>
				</form>
			</div>
		</div>
	);
};
// style={ { marginTop: '10px' } }

// <Input id='username' placeholder='Username' type='text' />
// <Input
// 	id='password'
// 	placeholder='Password'
// 	type='password'
// 	style={ { marginTop: '10px' } }
// 	/>
// <Submit text='Login' />
