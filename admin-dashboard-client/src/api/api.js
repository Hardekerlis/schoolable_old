/** @format */

// /** @format */
//
// import axios from 'axios';
//
// const buildClient = ({ req }) => {
// 	if (typeof window === 'undefined') {
// 		// On server
//
// 		return axios.create({
// 			baseURL:
// 				'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
// 			headers: req.headers,
// 		});
// 	} else {
// 		// On client
//
// 		return axios.create({
// 			baseURL: '/',
// 		});
// 	}
// };
//
// export default buildClient;

/** @format */

import axios from 'axios';

// const instance = axios.create({
// 	baseURL: 'admin.schoolable.se/api',
// });

export const get = async ({ url, headers, params }) => {
	const res = await axios.get(url, params, {
		params,
		headers,
	});

	return res;
};

export const post = async ({ url, headers, data }) => {
	try {
		const res = await axios.post(url, data, {
			headers: { 'Content-Type': 'application/json', ...headers },
		});
		return { res, err: undefined };
	} catch (err) {
		return { res: undefined, err: err.toJSON() };
	}
};
