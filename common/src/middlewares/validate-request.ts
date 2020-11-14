<<<<<<< HEAD
import express, { Request, Response, NextFunction } from 'express';
=======
import { Request, Response, NextFunction } from 'express';
>>>>>>> 5a707473f203d6c2a3e26187cbae995834508694
import { validationResult } from 'express-validator';

import { RequestValidationError } from '../errors/request-validation';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
}
