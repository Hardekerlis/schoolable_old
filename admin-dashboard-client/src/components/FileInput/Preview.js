/** @format */

import React from 'react';

export const Preview = props => {
	// console.log(props.event.t);
	// const value = props.value.split('\\');
	// const fileName = value[value.length - 1];

	return (
		<div className='previewChild' data-index={ props.index }>
			<p className='noselect'>{ props.fileName }</p>
			<i className='close icon' onClick={ props.removeFile }></i>
		</div>
	);
};
