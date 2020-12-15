/** @format */

import React from 'react';

import './Submit.css';

export const Submit = props => {
	return (
		<div className='SubmitButton noselect'>
			<button>{ props.text }</button>
		</div>
	);
};
