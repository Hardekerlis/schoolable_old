/** @format */

import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
// import { Buffer } from 'buffer';

const router = express.Router();

// Could use redis instead. Felt like overkill
const sessions: string[] = [];

router.get('/api/rsa', async (req: Request, res: Response) => {
	const id = uuidv4();
	const token = jwt.sign({ data: id }, process.env.JWT_KEY!);
	sessions.push(token);

	res.status(200).json({ token });
});

router.post('/api/rsa', async (req: Request, res: Response) => {
	const { signature, token } = req.body;

	console.log(sessions, token);

	if (!sessions[token]) {
		res.send({
			msg: 'No session',
			error: true,
		});
	} else {
		res.send({});
	}
});

export { router as rsaRouter };
