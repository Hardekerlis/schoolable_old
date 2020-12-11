/** @format */

import React, { useState } from 'react';

import './Input.css';

export const Input = props => {
	return (
		<div className='hjlasdhjkfdasjkhdaf'>
			{ props.label ? (
				<label className='hkgdhgdjkhfggf' htmlFor={ props.id }>
					{ props.label }
				</label>
			) : (
				''
			) }
			<input
				className='asdjhasda'
				id={ props.id }
				placeholder={ props.placeholder }
				type={ props.type }
			/>
		</div>
	);
};
