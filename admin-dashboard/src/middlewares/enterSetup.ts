/** @format */

import { Request, Response, NextFunction } from 'express';

export const enterSetup = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (process.env.INITAL_SETUP === 'true') {
		next();
	} else {
		res.send({ msg: 'Admin dashboard has already been setup', error: true });
	}
};
