/** @format */

import React, { useState } from 'react';
import { Buffer } from 'buffer';

import { Input, Submit, FileInput, Loader } from '../../components/index';

import './Login.css';

import { useToggle } from '../../hooks/useToggle';

import { get, post } from '../../api/api';
import { getFormData } from '../../misc/getFormData';

/* Possible props:
 * - multiple, if you want to allow multiple files
 *
 */

// <Input name='username' id='username' placeholder='Username' type='text' />;
export const Login = () => {
	const [toggleLoader, setToggleLoader] = useToggle(false);
	const [showPki, togglePki] = useToggle(false);
	const [session, setSession] = useState('');
	const [error, setError] = useState('');

	function str2ab(str) {
		const buf = new ArrayBuffer(str.length);
		const bufView = new Uint8Array(buf);
		for (let i = 0, strLen = str.length; i < strLen; i++) {
			bufView[i] = str.charCodeAt(i);
		}
		return buf;
	}

	function ab2str(buf) {
		return String.fromCharCode.apply(null, new Uint16Array(buf));
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
		// setToggleLoader();
		const form = event.target;

		const { username, password } = await getFormData(form);

		const res = await post({
			path: '/api/users/signin',
			data: { username, password },
		});

		// setTimeout(() => {
		// 	setToggleLoader();
		// 	console.log(toggleLoader);
		// }, 2000);
		if (!res.data.session) {
			console.log('No session');
		} else if (res.data.session) {
			console.log(res.data.session);
			setSession(res.data.session);
			togglePki();
		} else {
			console.log('Unexpected Error');
		}

		// const res = post("/api/users/signin", )

		// const { token } = (await get({ path: '/api/rsa' })).data;
		// const tokenBuff = Buffer.from(token);
		//
		// try {
		// 	const privatePem = await document.getElementById('RSAfile').files[0].text();
		// 	const privateKey = await importPrivateKey(privatePem);
		//
		// 	const signature = await window.crypto.subtle.sign(
		// 		{
		// 			name: 'RSA-PSS',
		// 			saltLength: 64,
		// 		},
		// 		privateKey,
		// 		tokenBuff,
		// 	);
		//
		// 	const res = await post({
		// 		path: '/api/rsa',
		// 		data: {
		// 			signature,
		// 			token,
		// 		},
		// 	});
		//
		// 	if (!res.error) {
		// 		if (res.authenticated) {
		// 			console.log('authenticated');
		// 		} else if (!res.authenticated) {
		// 			console.log('authentication failed');
		// 		}
		// 	} else if (res.error) {
		// 		console.log(res);
		// 	}
		//
		// 	console.log(res);
		// } catch (err) {
		// 	console.log(err);
		// 	console.log('Write logic for key import failure');
		// }
	};

	const getSignature = async file => {
		const tokenBuff = Buffer.from('session');

		try {
			const privatePem = await file.text();
			const privateKey = await importPrivateKey(privatePem);

			const signature = await window.crypto.subtle.sign(
				{
					name: 'RSA-PSS',
					saltLength: 64,
				},
				privateKey,
				tokenBuff,
			);

			return signature;
		} catch (err) {
			console.log(err);
			console.log('Write logic for key import failure');
		}
	};

	const pki = async event => {
		event.preventDefault();

		const form = event.target;
		const { FileList } = await getFormData(form);
		if (!FileList[0]) {
			return setError('Please supply a private key');
		}

		const bufferToHex = input =>
			[...new Uint8Array(input)]
				.map(v => v.toString(16).padStart(2, '0'))
				.join('');

		const signature = bufferToHex(await getSignature(FileList[0]));
		console.log(signature);

		const res = await post({
			path: '/api/rsa',
			data: { signature, session },
		});
		console.log(res);

		// const res = await post({
		// 		path: '/api/rsa',
		// 		data: {
		// 			signature,
		// 			token,
		// 		},
		// 	});
	};

	return (
		<div className='loginContainer'>
			<div className='loginArea'>
				<Loader active={ toggleLoader } />
				{ showPki ? (
					<form id='privateKeyForm' onSubmit={ pki }>
						<div className='loginError' id='loginError'>
							{ error }
						</div>
						<FileInput
							name='key'
							placeholder='Drop key here or click to upload'
							id='RSAfile'
							style={ { backgroundColor: 'var(--grey1)' } }
						/>
						<Submit text='Login' />
					</form>
				) : (
					<form id='loginForm' onSubmit={ loginSubmit }>
						<div className='loginError' id='loginError'>
							{ error }
						</div>
						<Input
							id='username'
							placeholder='Username'
							type='text'
							name='username'
						/>
						<Input
							id='password'
							placeholder='Password'
							type='password'
							style={ { marginTop: '10px' } }
							name='password'
						/>
						<Submit text='Login' />
					</form>
				) }
			</div>
		</div>
	);
};

// <FileInput
// 	name='key'
// 	placeholder='Drop key here or click to upload'
// 	id='RSAfile'
// 	style={ { backgroundColor: 'var(--grey1)' } }
// />
// style={ { marginTop: '10px' } }
