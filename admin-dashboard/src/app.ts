/** @format */

import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import {
	NotFoundError,
	errorHandler,
	LoggerStream,
	currentUser,
	winston,
} from '@schoolable/common';

winston.testSetup();

import {
	getSetupTokenRouter,
	createAdminRouter,
	rsaRouter,
	signinRouter,
} from './routes/routes-collection';

const app = express();

// app.use(
// 	morgan('combined', {
// 		stream: new LoggerStream(),
// 	}),
// );

app.set('trust proxy', true);
app.use(json({ limit: '100kb' }));
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test',
	}),
);

app.use(currentUser);

app.use(signinRouter);
app.use(getSetupTokenRouter);
app.use(rsaRouter);
app.use(createAdminRouter);

app.all('*', async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
