/** @format */

import React, { Component } from 'react';

const CustomUrlField = ({ record = {}, source }) => (
	<a href={ record[source] }>{ record[source] }</a>
);

export { CustomUrlField };
