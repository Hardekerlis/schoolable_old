/** @format */

import React from 'react';

import { Input, Submit, FileInput } from '../../components/index';

import './Login.css';

const loginSubmit = async event => {
	event.preventDefault();
	const rsaFile = await document.getElementById('RSAfile').files[0].text();
	console.log(rsaFile);
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
					<Input id='username' placeholder='Username' type='text' />
					<FileInput
						placeholder='Drop key here or click to upload'
						id='RSAfile'
						style={ { backgroundColor: 'var(--grey1)' } }
					/>
					<Submit text='Login' />
				</form>
			</div>
		</div>
	);
};
// <Input
// id='password'
// placeholder='Password'
// type='password'
// style={ { marginTop: '10px' } }
// />
// style={ { marginTop: '10px' } }
