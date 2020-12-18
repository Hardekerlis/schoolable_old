/** @format */

import React from 'react';
import { Dimmer, Loader as UiLoader } from 'semantic-ui-react';

import './Loader.css';

export const Loader = props => {
	return (
		<>
			{ props.active ? (
				<>
					<div className='loaderDimmer'></div>
					<div className='loader'>
						<UiLoader active={ props.active }>Loading</UiLoader>
					</div>
				</>
			) : (
				''
			) }
		</>
	);
};

// <Dimmer active={ props.active }>
// </Dimmer>
