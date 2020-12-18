/** @format */

import React from 'react';

import './Submit.css';

export const Submit = props => {
	return (
		<div className='SubmitButton noselect' data-type='submit'>
			<button>{ props.text }</button>
		</div>
	);
};
