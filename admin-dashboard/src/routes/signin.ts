/** @format */

import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import { BadRequestError, validateRequest } from '@schoolable/common';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { lookupUsername } from '../middlewares/lookupUsername';
import { Password } from '../services/password';
import { sessions } from './handshake';

const router = express.Router();

interface Session {
	id: string;
	remove: object;
	token: string;
}

router.post(
	'/api/users/signin',
	lookupUsername,
	[
		body('password')
			.trim()
			.notEmpty()
			.withMessage('You must supply a password'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { username, password } = req.body;
		// @ts-ignore
		const { user } = req;

		// console.log('Sessions:', sessions);

		const passwordsMatch = await Password.compare(user.password, password);

		if (!passwordsMatch) {
			throw new BadRequestError('Invalid credentials');
		}

		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				username: username,
			},
			process.env.JWT_KEY!,
		);

		if (user.publicKey) {
			const session: Session = {
				id: uuidv4(),
				token: token,
				remove: setTimeout(function () {
					// @ts-ignore
					delete sessions[session.id];
				}, 1000 * 1),
			};

			// @ts-ignore
			sessions[session.id] = session;

			const resData = {
				session: session.id,
				type: 'pki',
			};

			res.send(resData);
		} else {
			req.session = {
				jwt: token,
			};

			delete user.password;
			res.send(user);
		}
	},
);

export { router as signinRouter };
