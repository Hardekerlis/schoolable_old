/** @format */

import React, { useState, useEffect } from 'react';

import { Showcase } from './Showcase';
import './FileInput.css';

// const fileUploaded = event => {
// 	const showcase = document.getElementById('fileInputShowcase');
// 	const input = event.target;
// 	showcase.innerHTML = <Showcase value={ input.value } />;
// };

export const FileInput = props => {
	// const [showcase, setShowcase] = useState([]);
	const [files, setFiles] = useState([]);
	useEffect(() => {
		if (!props.multiple && files.length > 1) {
			setFiles([files[files.length - 1]]);
		}

		if (files.length > 0) {
			document.getElementById('fileInputShowcase').style.display = 'block';
		} else if (files.length === 0) {
			document.getElementById('fileInputShowcase').style.display = 'none';
		}
	});

	const removeFile = event => {
		let index = event.target.parentNode.getAttribute('data-indfilesex');
		const showcaseChildren = document.getElementById('fileInputShowcase')
			.children;

		// showcaseChildren[index].remove();
		console.log(files);
		// files.pop();
		// setFiles(files);
		// setFiles([...files]);
		// let index = event.target.value.split('\\');
		// index = index[index.length - 1];
		//
		// console.log(files);
		// files.splice(index);
		//
		// setFiles([...files]);
	};
	// entry={ `${event.target.value}\\${files.length}` }

	const addFile = event => {
		setFiles([
			...files,
			<Showcase
				value={ event.target.value }
				key={ event.target.value + files.length }
				removeFile={ removeFile }
				index={ files.length }
			/>,
		]);
	};

	return (
		<div className='fileInputParent' style={ props.style }>
			{ props.label ? <label htmlFor={ props.id }>{ props.label }</label> : '' }
			<div className='fileInput'>
				<input
					id={ props.id }
					className='hidden zindex2 file'
					type='file'
					onChange={ addFile }
					multiple={ props.multiple ? true : false }
				/>
				<div className='fakeFileInput noselect'>
					<input type='text' placeholder={ props.placeholder } />
				</div>
			</div>

			{ /* Add logic for reset button */ }
			{ props.resetButton ? (
				<button onClick={ () => console.log('remove key') }>Remove key</button>
			) : (
				''
			) }

			<div id='fileInputShowcase' className='fileInputShowcase'>
				{ files }
			</div>
		</div>
	);
};
// <i className='upload icon'></i>
// { files.length >= 1 ? <p>Files</p> : '' }
