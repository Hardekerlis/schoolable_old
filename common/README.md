## This is the common library for schoolable

### Middlewares:
<u>**current-user<a name="current-user"></a>**</u> </br>
Current user checks if there is a JWT in the session object from the cookie-session library. </br>
If there isn't a session it calls the **next** function. </br>
If there is a session it tries to parse the JWT to get the user payload, which is anything included in the JWT.

Source code:
```
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserType } from './user-types';

interface UserPayload {
  id: string;
  email: string;
  type: UserType
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
  next: NextFunction
) => {
  if(!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch(err) {}

  next();
};
```

Example:
```
app.get('/api/currentUser', currentUser, (req, res) => {
  const { currentUser } = req;
  res.send({ currentUser: currentUser })
});
```


<u>**validate-request<a name="validate-request"></a>**</u> </br>
Validate request checks if there are any errors from the express-validator library. </br>
If there are any errors it will throw a [RequestValidationError](#request-validation) with the errors in an array.

Source:
```
import { Request, Response, NextFunction } from 'express';

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
```

example:
```
import { body } from 'express-validator';

app.post(
  '/api/users/register',
  [
    body('email')
      .isEmail()
      .withMessage('email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  (req, res) => {
    // It will not reach this point if any of the input values are faulty
    cosnt { email, password } = req.body;
    res.send({})
  }
)
```

<u>**Require-auth<a name="require-auth"></a>**</u></br>
The require auth middlewares are all very similar.</br>
There are:
* requireAdminAuth
  * This makes it so only admins can access the url
* requireTeacherAuth
  * This makes it so only admins and teachers can access the url
* requireStudentAuth
  * This makes it so only admins, teachers and students can access the url
* requireAuth
  * This protects the url any unathorized users. All authorized users can access the url with this middleware

If an user isn't authenticated or trying to access something they don't have access to a [NotAuthorizedError](#not-authorized) will be thrown.

Example:
```
app.post(
  '/api/users/register',
  requireAdminAuth,
  (req, res) => {
    // Only users with the type admin in the user payload can reach this point
    res.send({});
  };
);
```

<u>**Error-handler<a name="error-handler"></a>**</u></br>
The error handler middleware should be invoked last in the app.ts file of each service.
The middleware checks if any errors thrown is an instance of the [CustomError](#custom-error) class if it is. It throws the custom error we have invoked. Otherwise it logs the error to the console and returns 'Unexpected error'.

source:
```
import { Request, Response, NextFunction} from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(err instanceof CustomError ) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  };

  console.error(err);
  res.status(400).send({
    errors: [{ message: 'Unexpected error' }]
  });
}
```

## Errors:
<u>**Custom-error<a name="custom-error"></a>**</u> </br>
The CustomError class extends the native Error class from node.</br>
When extending the CustomError class it needs three values from its child class.</br>
**Important!** When writing new custom errors please put them here in the common folder and publish it to npmjs.org.</br>
**It needs**:</br>
* statusCode which is supplied in the following way:
```
  class DummyError extends Custom Error {
    statusCode = 400; // This can be any status code. Please follow http status codes.
  }
```
* Error message which is supplied in the super function
```
  class DummyError extends Custom Error {
    // The constructor also needs the Object.setPrototypeOf function
    statusCode = 400; // This can be any status code. Please follow http status codes.

    constructor() {
      super('This is a dummy message'); // Error message

      Object.setPrototypeOf(this, NotAuthorizedError.prototype); // Important when extending node base classes
    }
  }
```
* serializeErrors which is a function supplied to the parent class from the child class
```
  class DummyError extends Custom Error {
    statusCode = 400; // This can be any status code. Please follow http status codes.

    constructor() {
      super('This is a dummy message'); // Error message

      Object.setPrototypeOf(this, NotAuthorizedError.prototype); // Important when extending node base classes
    }

    serializeErrors() {
      return [{ message: 'Not authorized' }] // this is the error message returned to the client
    }
  }
```

<u>**Request-validation<a name="request-validation"></a>**</u> </br>
The request validation error returns a status code of 400 and an error message with 'Invalid request parameters'.

This is to be used with the express-validator library. If the supplied inputs aren't valid the application should throw this custom error.

Source:
```
import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  };

  serializeErrors() {
    return this.errors.map(err => {
      return { message: err.msg, field: err.param };
    });
  };
};
```

Example:
```
throw new ValidationError();
```

<u>**Database-connection<a name="database-connection"></a>**</u> </br>
The DatabaseConnectionError class throws an error with the status code 500. </br>
The reason supplied is 'Database connection error'.</br>
This should only be used once when trying to connect to the database.

Source:
```
import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Database connection error';

  constructor() {
    super('Database connection error');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  };

  serializeErrors() {
    return [
      { message: this.reason }
    ]
  }
};
```

example:
```
throw new DatabaseConnectionError();
```

<u>**Not-found<a name="not-found"></a>**</u> </br>
This is just a basic 404 error. This is throw when the request path/url can't be found.
This should only be used once in every service. Like this:
```
import express from 'express';
import 'express-async-errors';

import { NotFoundError, errorHandler } from '@schoolable/common';

import { exampleRouter } from './routes/routes-collection';


const app = express();

app.use(exampleRouter);

app.all('*', async () => {
  throw new NotFoundError(); // Only place in every service this error should be used
});

app.use(errorHandler);

export { app }

```

source:
```
import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError);
  };

  serializeErrors() {
    return [{ message: 'Not found' }];
  };
};
```

example:
```
app.all('*', () => {
  throw new NotFoundError();
})
```

<u>**Not-authorized<a name="not-authorized"></a>**</u> </br>
This custom error should be used when a user is trying to access something they don't have access to.

Source:
```
import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not authorized')

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  };
};
```

Example:
The user is signed in as type student
```
app.get(
  '/api/setup/config',
  requireAdminAuth, // This will throw an 401 error
  (req, res) => {
    // Only accessiable by type admin
    res.send({})
  };
);
```
