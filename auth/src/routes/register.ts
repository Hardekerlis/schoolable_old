import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, requireAdminAuth } from '@schoolable/common';

import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/register',
  requireAdminAuth,
  [
    body('email')
      .isEmail()
      .withMessage('Email must be defined'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Check if the email already is registered

    // Hashing is done via mongoose in models/user.ts
    // Save user

    // Generate JWT

    // Store it on session Object

    // Respond with 201 and user

    console.log('assd')
    res.send({ success: true });
  }
);

export { router as registerRouter }
