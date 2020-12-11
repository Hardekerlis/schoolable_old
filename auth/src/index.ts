/** @format */

import mongoose from 'mongoose';
import { app } from './app';
const start = async () => {
  const { env } = process;
  if (!env.appRoot) {
    // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
    console.warn(
      '\x1b[33m[WARNING]\x1b[31m',
      'Please add the following line to your dockerfile!\x1b[33m',
    );
    console.warn('\x1b[33m[WARNING]\x1b[0m', 'ENV appRoot="/app"');
    return;
  }

  process.env.NODE_ENV = !process.env.NODE_ENV ? 'dev' : process.env.NODE_ENV;

  // if(!process.env.MONGO_URI) {
  //     throw new Error('MONGO_URI must be defined');
  //   };
  //
  //   try {
  //     await mongoose.connect(process.env.MONGO_URI!, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //       useCreateIndex: true
  //     });
  //     console.log('Connected to MongoDB');
  //   }catch(err) {
  //     console.error(err);
  //   }

  app.listen(3000, () => {
    if (process.env.NODE_ENV === 'dev') {
      console.log(`Listening on *:3000`);
    }
  });
};

start();
