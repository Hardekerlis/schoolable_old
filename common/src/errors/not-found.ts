import { CustomError } from './custom-error';

class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError);
  };

  serializeError() {
    return [{ message: 'Not found' }];
  };
};
