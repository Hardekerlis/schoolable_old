import request from 'supertest';
import { app } from '../../app';

const path = '/api/users/register';
// /api/users/signup
it('returns a 201 on successful signup', async () => {
  return request(app)
    .post(path)
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post(path)
    .send({
      email: 'notanemail',
      password: 'password'
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post(path)
    .send({
      email: 'test@test.com',
      password: 'p' // Too short
    })
    .expect(400);
});

it('returns a 400 with missing email and/or password', async () => {
  await request(app)
    .post(path)
    .send({})
    .expect(400)

  await  request(app)
  .post(path)
    .send({ email: 'test@test.com '})
    .expect(400)

  await request(app)
    .post(path)
    .send({ password: 'password' })
    .expect(400)
});

it('returns a 400 if email already is in use', async () => {
  await request(app)
    .post(path)
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
    .post(path)
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

it('Should not set a coookie on signup', async () => {
  const res = await request(app)
    .post(path)
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

    expect(res.get('Set-Cookie')).not.toBeDefined();
});
