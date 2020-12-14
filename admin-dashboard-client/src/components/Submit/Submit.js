/** @format */

import React, { useState } from 'react';

import './Submit.css';

export const Submit = props => {
	return (
		<div className='SubmitButton'>
			<button>{ props.text }</button>
		</div>
	);
};
