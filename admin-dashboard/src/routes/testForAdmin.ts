/** @format */

import express, { Request, Response } from 'express';
import { UnexpectedError } from '@schoolable/common';

import { Admin } from '../models/admin';

const router = express.Router();

router.get('/api/admin', async (req: Request, res: Response) => {
	const admin = await Admin.find({});
	if (admin.length === 0) {
	} else if (admin.length > 0) {
	} else {
		throw new
	}
});
