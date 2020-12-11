/** @format */

import { CustomError } from './custom-error';

export class UnexpectedError extends CustomError {
  statusCode = 500;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, UnexpectedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
