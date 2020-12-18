/** @format */

import { useState } from 'react';

export const useToggle = (initalVal = false) => {
	// Call useState
	const [state, setState] = useState(initalVal);

	const toggle = () => {
		setState(!state);
	};

	return [state, toggle];
};
