/** @format */

import React, { useState, useEffect } from 'react';

import { Showcase } from './Showcase';
import './FileInput.css';

/**
 * Custom styled file input
 * @method FileInput
 * @Prop {bool} Pass multiple as prop and the file input will support multiple files
 * @Prop {string} Pass a string to placeholder as a prop to give the input a placeholder
 * @Prop {string} Pass a string to id as a prop to give the input an id
 */

export const FileInput = props => {
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
		let index = event.target.parentNode.getAttribute('data-index');

		let fileName = document.getElementById(props.id).value.split('\\');
		fileName = fileName[fileName.length - 1];

		if (event.target.parentNode.children[0].innerHTML === fileName) {
			document.getElementById(props.id).value = '';
		}

		let i = -1;
		setFiles(
			files.filter(file => {
				i++;
				return i !== parseInt(index);
			}),
		);
	};

	const addFile = event => {
		setFiles([...files, event.target.value]);
	};

	const showcaseFile = () => {
		let returnElems = [];
		let i = 0;
		for (let file of files) {
			returnElems.push(
				<Showcase
					value={ file }
					key={ file + files.length }
					removeFile={ removeFile }
					index={ i }
				/>,
			);
			i++;
		}

		return <>{ returnElems }</>;
	};

	return (
		<div className='fileInputParent'>
			<div className='fileInput'>
				<input
					id={ props.id }
					className='hidden zindex2 file'
					type='file'
					onChange={ addFile }
					multiple={ props.multiple ? true : false }
				/>
				<div className='fakeFileInput noselect'>
					<input
						style={ props.style }
						type='text'
						placeholder={ props.placeholder }
					/>
				</div>
			</div>

			{ /* Add logic for reset button */ }
			{ props.resetButton ? (
				<button onClick={ () => console.log('remove key') }>Remove key</button>
			) : (
				''
			) }

			<div id='fileInputShowcase' className='fileInputShowcase'>
				{ showcaseFile() }
			</div>
		</div>
	);
};
