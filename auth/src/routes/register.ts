import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, requireAdminAuth } from '@schoolable/common';

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
    res.send();
  }
);

export { router as registerRouter }
