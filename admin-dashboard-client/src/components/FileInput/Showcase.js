/** @format */

import React from 'react';

export const Showcase = props => {
	// console.log(props.event.t);
	const value = props.value.split('\\');
	const fileName = value[value.length - 1];

	return (
		<div className='showcaseChild' data-index={ props.index }>
			<p className='noselect'>{ fileName }</p>
			<i className='close icon' onClick={ props.removeFile }></i>
		</div>
	);
};
