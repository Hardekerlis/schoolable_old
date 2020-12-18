/** @format */

import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@schoolable/common';

import { Admin } from '../models/admin';

export const lookupUsername = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { username } = req.body;
	if (!username) {
		throw new BadRequestError('Invalid credentials');
	}

	const exists = await Admin.findOne({ username });

	if (!exists) {
		throw new BadRequestError('Invalid credentials');
	} else {
		// @ts-ignore
		req.user = exists;
		next();
	}
};
