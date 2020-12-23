/** @format */

import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { BadRequestError } from '@schoolable/common';

const router = express.Router();

// Could use redis instead. Felt like overkill
export const sessions: object = {};

// router.get('/api/rsa', async (req: Request, res: Response) => {
// 	const id = uuidv4();
// 	const token = jwt.sign({ data: id }, process.env.JWT_KEY!);
//
// 	res.status(200).json({ token });
// });

const publicPem = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAvTfGOl5voEU7IbMLITdU
ZerL0kQMIBVt6AEWXEETCt3yxP/VgBNF/gUmax80Eno0GfVT2cSOq4SDS77BTTn0
XgC9IoDvudj9iRMoUmnqmpWSU49Gmbor/jKC7j7J60V51j1pIsyEUIkKrS3hyvfv
EA1u4gWiUfuCMKoZT7bED963acXV7xsJhMRSoFLY66AOrbooE7MnVrGxwF8wP49i
OdzcTxGIE/BdeFYVQ37JEGI6G0TdTmYhxLVwl4lLt4LUGvIQQuVLxR2DMK09u3bs
2gFYp/QCSdUqCH0jH9Q02j5BZ+rbbL0WaqEmP7lS7CLJ0pDY1mAAMc8UvVp2eirz
XdHckKjWF4RHqKySErY/prp8Whv1NHIZYhGSO//+sIyeJ08+rpzbROx5mZopga5q
QyWO3lfzhMqGUTsdonKHPBdvmwJTWkJzIa9S7b/j/sT88m++/aFGDc0o5pQXdgMn
L2m1MqAR8FnOlTLVigaMrfOFyYiTM8FoSlUlrP6rJNnh6rxT9Ve2lvLxXC99PFf2
Zz74fMgKYUjGG2YKHHqmcQNhiZQD/T9g/oeTkEwuOWUtxgKUUXYIZJS+QS07QJhq
YwC6rje50Gtpo09c78fd5av99395Sgem/vNXAF7nztowgTrEtqCEHtsuTQZMVSXe
7bV7afOFUTR44nhHJwIy4MsCAwEAAQ==
-----END PUBLIC KEY-----`;

router.post('/api/rsa', async (req: Request, res: Response) => {
	const { signature, session } = req.body;
	// console.log(req.body);

	let resData = {};
	// @ts-ignore
	if (sessions[session]) {
		try {
			const verifier = crypto.createVerify('SHA256');
			verifier.update(Buffer.from(session));

			const verified = verifier.verify(
				{
					key: publicPem,
					saltLength: 64,
					padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
				},
				signature,
				'hex',
			);
			console.log(verified);
			resData = {
				verified: true,
			};
		} catch (err) {
			resData = {
				verified: false,
				error: true,
				msg: err,
			};
			console.log(err);
		}
	} else {
		throw new BadRequestError('Session expired');
	}

	res.send(resData);
});

export { router as rsaRouter };
