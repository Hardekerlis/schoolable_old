/** @format */

import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
	const [errors, setErrors] = useState(null);

	const doRequest = async () => {
		try {
			setErrors(null);
			const res = await axios[method](url, body);
			if (onSuccess) {
				onSuccess(res.data);
			}

			return res.data;
		} catch (err) {
			setErrors(err);
		}
	};

	return { doRequest, errors };
};

export default useRequest;
