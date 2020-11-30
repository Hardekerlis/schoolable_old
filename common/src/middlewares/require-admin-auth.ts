/** @format */

import { Request, Response, NextFunction } from 'express';

import { UserType } from './user-types';
import { NotAuthorizedError } from '../errors/not-authorized';
import { Winston } from '../logging/winston';

const winston = new Winston();

export const requireAdminAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  winston.info(`Request for admin resource. client ip: ${req.ip}`);
  if (!req.currentUser || req.currentUser.type !== UserType.Admin) {
    winston.warn(`Failed request from admin resource. client ip: ${req.ip}`);
    throw new NotAuthorizedError();
  }

  next();
};
