/** @format */

import React from 'react';
import forge from 'node-forge';
// import crypto from 'crypto';
console.log(crypto.subtle);
import { Buffer } from 'buffer';

forge.options.usePureJavaScript = true;

import { Input, Submit, FileInput } from '../../components/index';

import './Login.css';

import { get, post } from '../../api/api';

function str2ab(str) {
	const buf = new ArrayBuffer(str.length);
	const bufView = new Uint8Array(buf);
	for (let i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}

const importPrivateKey = pem => {
	const pemHeader = '-----BEGIN PRIVATE KEY-----';
	const pemFooter = '-----END PRIVATE KEY-----';
	const pemContents = pem.substring(
		pemHeader.length,
		pem.length - 1 - pemFooter.length,
	);

	const binaryDerString = window.atob(pemContents);

	const binaryDer = str2ab(binaryDerString);

	return window.crypto.subtle.importKey(
		'pkcs8',
		binaryDer,
		{
			name: 'RSA-PSS',
			modulusLength: 4096,
			publicExponent: new Uint8Array([1, 0, 1]),
			hash: 'SHA-256',
		},
		true,
		['sign'],
	);
};

const loginSubmit = async event => {
	event.preventDefault();

	const { token } = (await get({ path: '/api/rsa' })).data;
	const tokenBuff = Buffer.from(token);

	try {
		const privatePem = await document.getElementById('RSAfile').files[0].text();
		const privateKey = await importPrivateKey(privatePem);

		const signature = await window.crypto.subtle.sign(
			{
				name: 'RSA-PSS',
				saltLength: 64,
			},
			privateKey,
			tokenBuff,
		);
		console.log(signature);

		const res = await post({
			path: '/api/rsa',
			data: {
				signature,
				token,
			},
		});

		console.log(res);
	} catch (err) {
		console.log(err);
		console.log('Write logic for key import failure');
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
