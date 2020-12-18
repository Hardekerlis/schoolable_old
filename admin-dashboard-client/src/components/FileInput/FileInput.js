/** @format */

import React, { useState, useEffect } from 'react';

import { Preview } from './Preview';
import { useToggle } from '../../hooks/useToggle';
import './FileInput.css';

/**
 * Custom styled file input
 * @method FileInput
 * @prop {bool} Pass multiple as prop and the file input will support multiple files
 * @prop {string} Pass a string to placeholder as a prop to give the input a placeholder
 * @prop {string} Pass a string to id as a prop to give the input an id
 */

const r = Math.random().toString(36).substring(7);
export const FileInput = props => {
	// Files are the currently selected files
	const [files, setFiles] = useState([]);
	const [showPreview, toggleShowPreview] = useToggle(false);

	useEffect(() => {
		// If the multiple prop is false or undefined more than one file shouldn't be allowed to be selected
		if (!props.multiple && files.length > 1) {
			setFiles([files[files.length - 1]]);
		}

		// Whether to show preview element or not
		if (files.length > 0 && !showPreview) {
			toggleShowPreview();
		} else if (files.length === 0 && showPreview) {
			toggleShowPreview();
		}

		// Append current selected files to mock input.
		// The selected files are stored in state
		const mockInput = document.getElementById(r);
		mockInput.fileListArr = files;
	});

	// Remove the specified file from preview and mock file input
	const removeFile = async event => {
		const index = event.target.parentNode.getAttribute('data-index');
		const fileListArr = document.getElementById(r).fileListArr;

		// Not beautiful code.
		// Refactor!
		let i = -1;
		// Loop through selected files and check if i is equal to the index of the file to deselect
		const _fileListArr = fileListArr.filter(() => {
			i++;
			return i !== parseInt(index);
		});

		// Update state to desired files
		setFiles(_fileListArr);
	};

	// Add the selected files to both preview and mock file input
	const addFile = event => {
		const fileList = event.target.files; // Get FileList object from input
		const fileListArr = Array.from(fileList); // Make object into array

		// Check if any index is undefined or name isn't present
		for (const _file of fileListArr) {
			if (_file === undefined || _file.name === '') {
				return;
			}
		}

		event.target.value = '';

		// Update the state to update the compnent to view the files
		setFiles(fileListArr);
	};

	const previewFiles = () => {
		let returnElems = [];

		// Excellent code! xd
		// Refactor!
		let i = 0;
		for (let file of files) {
			returnElems.push(
				<Preview
					fileName={ file.name }
					key={ file.name + i }
					removeFile={ removeFile }
					index={ i }
				/>,
			);
			i++;
		}

		return <>{ returnElems }</>;
	};

	if (!props.name) {
		throw new Error('Please specify a name for the input');
	}

	return (
		<div className='fileInputParent' data-type='input'>
			<div className='fileInput'>
				<input
					name={ props.name }
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
						name={ props.name + '-fake' }
						data-type='file'
						id={ r }
					/>
				</div>
			</div>
			{ /* Add logic for reset button */ }
			{ props.resetButton ? (
				<button onClick={ () => console.log('remove key') }>Remove key</button>
			) : (
				''
			) }
			{ showPreview ? (
				<div id='fileInputPreview' className='fileInputPreview'>
					{ previewFiles() }
				</div>
			) : (
				''
			) }
		</div>
	);
};
