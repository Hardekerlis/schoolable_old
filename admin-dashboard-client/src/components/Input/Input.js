/** @format */

import React from 'react';

import './Input.css';

export const Input = props => {
	if (props.type === 'file') {
		throw new Error('Use FileInput component for file input');
	}
	return (
		<div className='inputParent' style={ props.style }>
			{ props.label ? <label htmlFor={ props.id }>{ props.label }</label> : '' }
			<input
				className='normalInput'
				id={ props.id }
				placeholder={ props.placeholder }
				type={ props.type }
			/>
		</div>
	);
};
