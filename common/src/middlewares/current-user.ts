/** @format */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { winston } from '../logging/winston';

import { UserType } from './user-types';

interface UserPayload {
  id: string;
  email: string;
  type: UserType;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  winston.debug(`Running currentUser middleware`);
  if (!req.session?.jwt) {
    winston.debug(`No session cookie found on for request`);
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!,
    ) as UserPayload;
    winston.info(`Successfully parsed payload for user with id: ${payload.id}`);
    req.currentUser = payload;
  } catch (err) {}

  next();
};
