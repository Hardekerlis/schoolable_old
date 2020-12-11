/** @format */

import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
	validateRequest,
	BadRequestError,
	requireAuth,
} from '@schoolable/common';
import jwt from 'jsonwebtoken';

const router = express.Router();

import { Admin } from '../models/admin';
import { enterSetup } from '../middlewares/enterSetup';

router.post(
	'/api/setup/account',
	requireAuth,
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.trim()
			.isLength({ min: 8, max: 30 })
			.withMessage('Password must be between 8 and 30 characters'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, username, phoneNr, publicKey, password, name } = req.body;
		const admin = await Admin.build({
			email,
			username,
			phoneNr,
			publicKey,
			password,
			name,
		}).save();
		res.status(201).json(admin);
	},
);

export { router as createAdminRouter };
