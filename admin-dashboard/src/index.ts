/** @format */

import mongoose from 'mongoose';

import { app } from './app';

import { Admin } from './models/admin';

const start = async () => {
	console.log('Starting up...');
	const { env } = process;

	// if (!env.appRoot) {
	//   // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
	//   console.warn(
	//     '\x1b[33m[WARNING]\x1b[31m',
	//     'Please add the following line to your dockerfile!\x1b[33m',
	//   );
	//   console.warn('\x1b[33m[WARNING]\x1b[0m', 'ENV appRoot="/app"');
	//   return;
	// }

	env.NODE_ENV = !env.NODE_ENV ? 'dev' : env.NODE_ENV;

	if (!env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}

	if (!env.MONGO_URI) {
		throw new Error('MONGO_URI must be defined');
	}

	try {
		await mongoose.connect(env.MONGO_URI!, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error(err);
	}

	// Creates initalAccount if Schoolable hasn't been setup yet

	app.listen(3000, () => {
		if (env.NODE_ENV === 'dev') {
			console.log('Listening on *:3000');
		}
	});
};

start();
