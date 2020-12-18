/** @format */

// Important to note!
// Currently only works to get text data from file inputs
export const getFormData = async form => {
	// Gets the children of the form
	const children = Object.values(form.children);

	// Filters out any elements that haven't been created by a Input component
	const inputParents = children.filter(child => {
		return child.getAttribute('data-type') === 'input';
	});

	// Loops through all children of the form which are of type Input
	for (let child of inputParents) {
		let index = 0;
		// Gets all children of the Input components which are input elements
		const input = child.querySelectorAll('input');
		// Gets the values from the inputs
		if (input[0].type === 'file') {
			index++;
		}
		await result.set(input[index]); // Important to note it only gets value from first input in each Input component
	}

	return result.get();
};

const result = {
	values: {}, // Collection of values collected from form
	async set(elem) {
		// Check if type is file or not
		if (elem.getAttribute('data-type') !== 'file') {
			this.values[elem.name] = elem.value; // Set input value to values object
		} else {
			// Append all files to values object
			this.values['FileList'] = elem.fileListArr;
		}
	},
	get() {
		return this.values;
	},
};
