/** @format */

import axios from 'axios';

// const instance = axios.create({
// 	baseURL: 'admin.schoolable.se/api',
// });

export const get = async ({ path, headers, params }) => {
	// console.log(path);
	const res = await axios.get(path, params, {
		params,
		headers,
	});

	return res;
};

export const post = async ({ path, headers, data }) => {
	const res = await axios.post(path, data, {
		headers: { 'Content-Type': 'application/json', ...headers },
	});
	return res;
};
