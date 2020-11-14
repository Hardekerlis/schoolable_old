import { Request, Response, NextFunction } from 'express';

import { UserType } from './user-types';
import { NotAuthorizedError } from '../errors/not-authorized';

export const requireAdminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(!req.currentUser || req.currentUser.type !== UserType.Admin) {
    throw new NotAuthorizedError();
  }

  next();
}
