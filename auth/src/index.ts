/** @format */

import mongoose from 'mongoose';

import { app } from './app';

const start = () => {
  app.listen(3000, () => {
    console.log(`Listening on *:3000`);
  });
};

start();
