/** @format */

import { Request, Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';

import { RequestValidationError } from '../errors/request-validation';
import { winston } from '../logging/winston';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  winston.debug(`Validating request`);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    winston.debug(`Validation failed`);
    throw new RequestValidationError(errors.array());
  }

  winston.debug(`Validation successful`);

  next();
};
