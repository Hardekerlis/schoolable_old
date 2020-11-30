/** @format */

import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import { NotFoundError, errorHandler } from '@schoolable/common';

import { registerRouter } from './routes/routes-collection';
import { LoggerStream, Winston } from './config/winston';

new Winston().debug('Fuck me backwards');
const app = express();

app.use(
  morgan('combined', {
    stream: new LoggerStream(),
  }),
);

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
);

app.use(registerRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
