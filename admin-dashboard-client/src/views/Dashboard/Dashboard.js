/** @format */

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import './Dashboard.css';

export const Dashboard = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	return <div>{ !isAuthenticated || <Redirect to='/login' /> }</div>;
};
