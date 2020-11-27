/** @format */

import mongoose from 'mongoose';

import { app } from './app';

const start = () => {
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

  app.listen(3000, () => {
    console.log(`Listening on *:3000`);
  });
};

start();
