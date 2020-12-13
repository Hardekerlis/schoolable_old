/** @format */

import React from 'react';

const rmFile = event => {
	const parent = event.target.parentElement;
	console.log(parent);
};

export const Showcase = props => {
	// console.log(props.event.t);
	const value = props.value.split('\\');
	const fileName = value[value.length - 1];

	// const removeFile = () => {
	// 	let index = props.entry.split('\\');
	// 	index = index[index.length - 1];
	//
	// 	const files = props.files;
	// 	console.log(files);
	// 	delete files[index];
	//
	// 	console.log(files);
	// 	props.setFiles([...files]);
	// };

	return (
		<div className='showcaseChild' data-index={ props.index }>
			<p className='noselect'>{ fileName }</p>
			<i className='close icon' onClick={ props.removeFile }></i>
		</div>
	);
};
