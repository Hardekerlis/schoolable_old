/** @format */

import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '@schoolable/common';

const router = express.Router();

import { Admin } from '../models/admin';

router.get('/api/setup/token', async (req: Request, res: Response) => {
	const acc = await Admin.find();

	console.log(acc);

	if (!acc[0]) {
		const token = jwt.sign({ type: 'setup' }, process.env.JWT_KEY!);

		req.session = {
			jwt: token,
		};

		res.send();
	} else {
		throw new BadRequestError('Route is one time use');
	}
});

export { router as getSetupTokenRouter };
