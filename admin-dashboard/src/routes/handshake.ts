/** @format */

import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const router = express.Router();

// Could use redis instead. Felt like overkill
export const sessions: object[] = [];

// router.get('/api/rsa', async (req: Request, res: Response) => {
// 	const id = uuidv4();
// 	const token = jwt.sign({ data: id }, process.env.JWT_KEY!);
//
// 	res.status(200).json({ token });
// });

// function str2ab(str: string) {
// 	const buf = new ArrayBuffer(str.length);
// 	const bufView = new Uint8Array(buf);
// 	for (let i = 0, strLen = str.length; i < strLen; i++) {
// 		bufView[i] = str.charCodeAt(i);
// 	}
// 	return buf;
// }

// const importPublicKey = (pem: string) => {
// 	const pemHeader = '-----BEGIN PRIVATE KEY-----';
// 	const pemFooter = '-----END PRIVATE KEY-----';
// 	const pemContents = pem.substring(
// 		pemHeader.length,
// 		pem.length - 1 - pemFooter.length,
// 	);
//
// 	const binaryDerString = window.atob(pemContents);
//
// 	const binaryDer = str2ab(binaryDerString);
//
// 	return crypto.subtle.importKey(
// 		'pkcs8',
// 		binaryDer,
// 		{
// 			name: 'RSA-PSS',
// 			modulusLength: 4096,
// 			publicExponent: new Uint8Array([1, 0, 1]),
// 			hash: 'SHA-256',
// 		},
// 		true,
// 		['sign'],
// 	);
// };

const publicPem = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD0MtrG2RcVPA8555IP+qhu3pVbJdwPF9XLSRl47PPX007k7v3nrmPKk9/tGOgkEQ9aKvhfXb5+1TVrKqfJ2W5X/KCEFclrZA9PdH7b8cntSHSg6C8LMRBpTB3Ql0Pi2yFP8b3J9wn5nXRJXqwedpxmBRAwtU5cz3oOw9DTRZEdJQIDAQAB
-----END PUBLIC KEY-----`;

router.post('/api/rsa', async (req: Request, res: Response) => {
	const { signature, session } = req.body;
	console.log(req.body);

	const verify = crypto.createVerify('SHA256');
	verify.update(Buffer.from('session'));

	console.log(verify.verify(publicPem, signature, 'hex'));

	// @ts-ignore
	// const publicKey = publicPem.toString('ascii');
	// console.log(publicKey);

	// crypto.createVerify('sha256', pubKey);
	// console.log(req.body);
	// console.log(publicPem);

	// const publicKey = crypto.createPublicKey({
	// 	key: publicPem,
	// 	format: 'pem',
	// 	type: 'spki',
	// });

	// console.log(publicKey);

	// console.log('1');
	// const verify = crypto.createVerify('RSA-SHA256');
	// console.log('2');
	// verify.update(session);
	// console.log('3');
	//
	// console.log(publicPem);
	// console.log(signature);
	// const verification = verify.verify(publicPem, signature, 'hex');
	// console.log('4');
	//
	// console.log(verification);

	// const publicKey = crypto.createPublicKey({
	// 	key: publicPem,
	// 	format: 'pem',
	// });
	// console.log(publicKey);
	// const verifier = crypto.createVerify('RSA-SHA256');
	// verifier.update(session);
	// const sigBuf = Buffer.from(signature, 'hex');
	// verifier.verify(publicKey)

	res.send({});
});

export { router as rsaRouter };
