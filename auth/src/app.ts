import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

console.log("ole är bäst");

const app = express();

app.set('trust proxy', true);
app.use(json());
console.log(process.env.NODE_ENV);
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}));


app.all('*', async () => {
  throw new NotFoundError();
});
