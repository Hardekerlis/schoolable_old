/** @format */

import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { Winston } from '../logging/winston';

const winston = new Winston();

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    winston.debug(
      `Custom error - statusCode: ${err.statusCode}, url: ${
        req.url
      }, message: ${JSON.stringify(err.serializeErrors())}`,
    );
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  winston.warn(err);
  res.status(400).send({
    errors: [{ message: 'Unexpected error' }],
  });
};
