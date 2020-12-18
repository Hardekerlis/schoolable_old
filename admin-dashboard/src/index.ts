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

		await Admin.build({
			email: 'example@example.se',
			username: 'Admin',
			password: 'Admin',
			publicKey: `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxupwrXdgwyzIyxFWVji+
JMuSPFdYAXZlXuI+imDzpUtYiV9Z4ZQAJHVxELJEffqQJlx0QMp7fsrRWf1iodY3
z9+Yj4oGogqoVciy3PanVjfxYrFemaj3HDycoWPDAguj+yK9eIeVlB3nAukeEniH
3ougacpLTtvGziAm0xSrpGoe+yL9kJBnWvXfaXKdFsrh1WqsF9/tkoaf/xw7HnZz
Inqqe3sE8reigSDJId+S7QSl/Pi18DJJh9Jwyeo1OxUdin3tOZPTswn4DqLC07VJ
/Gx2M0wwShLIEigeWH9kDtBRM/KZD+dd7rxxjsUwqubLNb/2uiEX1Xej3ctSbEys
sNOcQv954Vqb95qlt8Ram+AIS4g3sUKrIqGedImsxKSUzpA6NvW8D67WGZBCkmTB
gomO8e4LQkicEivkmn3ImAPLgHVFWt0E406Azv/xQTLJWNxbCOW124pvnM+SJMig
Td9RBg2IRH+2JtzXBTrAC85ijYmyLUXplJ1jvQV1rx932KrhV0gA1QV1LJrCJzyh
qdLv97VDBINkNjkn/2xDj5b4iUzV1g6c2r8qlBr5XTmp8Z58ubuytGnLLoSg5cTB
wtV8uvvfq/7GMQzaCJMmEKXGUxvZxO8yt+iE0nSyrq1QZDJMJpFP5ukwzl6E9dzn
dDSha9QgOxbZsUVXxeftpZcCAwEAAQ==
-----END PUBLIC KEY-----
`,
			name: {
				first: 'Admin',
				last: 'Admin',
			},
		}).save();

		console.log('Connected to MongoDB');
	} catch (err) {
		console.error(err);
	}

	app.listen(3000, () => {
		if (env.NODE_ENV === 'dev') {
			console.log('Listening on *:3000');
		}
	});
};

start();
