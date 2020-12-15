/** @format */

import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto, { scrypt } from 'crypto';
import { Buffer } from 'buffer';

const router = express.Router();

router.get('/api/rsa/data', async (req: Request, res: Response) => {
	const token = jwt.sign(
		{ data: 'ihfashkjlafshjklasfjhsfajkh' },
		process.env.JWT_KEY!,
	);

	console.log(
		crypto.sign('sha256', Buffer.from('token'), {
			key: `-----BEGIN OPENSSH PRIVATE KEY-----
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
WqMTSSdXbGM/k1Xh1Ks7bV0z0=
-----END OPENSSH PRIVATE KEY-----
`,
			padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		}),
	);

	// const signature = crypto.sign('sha256', Buffer.from(token), {
	// 	key: '123123123',
	// 	padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
	// });

	// console.log(signature);

	res.status(200).json({ token });
});

export { router as rsaRouter };
