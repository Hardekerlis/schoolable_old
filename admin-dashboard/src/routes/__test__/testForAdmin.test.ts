/** @format */

// /** @format */
//
// import request from 'supertest';
// import { app } from '../../app';
//
// const path = '/api/admin';
//
// it('Return "exists: true" if there is an admin account', async () => {
// 	const res = await request(app).get(path).send().expect(200).expect(200);
//
// 	expect(res.body.exists).toEqual(true);
// });
//
// it('Return "exists: false" if there isn\'t an admin account', async () => {
// 	const res = await request(app).get(path).send().expect(200);
//
// 	expect(res.body.exists).not.toEqual(true);
// });
