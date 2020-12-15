/** @format */

import React from 'react';
import crypto from 'crypto';
import { Buffer } from 'buffer/';

console.log(crypto);

import { Input, Submit, FileInput } from '../../components/index';

import './Login.css';

import { get, post } from '../../api/api';

const loginSubmit = async event => {
	event.preventDefault();
	try {
		const rsaKey = await document.getElementById('RSAfile').files[0].text();
		// console.log(rsaKey);
		const { token } = (await get({ path: '/api/rsa/data' })).data;

		const signature = crypto.Sign('sha256', Buffer.from(token), {
			key: rsaKey,
			padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		});

		console.log(signature);
	} catch (err) {
		console.log(err);
		return;
	}
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
