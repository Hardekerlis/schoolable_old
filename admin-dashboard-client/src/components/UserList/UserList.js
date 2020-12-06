/** @format */

import React from 'react';
import { List, Datagrid, TextField, EmailField, UrlField } from 'react-admin';
import { CustomUrlField } from '../index';

const UserList = props => (
	<List { ...props }>
		<Datagrid rowClick='edit'>
			<TextField source='id' />
			<TextField source='name' />
			<EmailField source='email' />
			<TextField source='phone' />
			<CustomUrlField source='website' />
			<TextField source='company.name' />
		</Datagrid>
	</List>
);

export { UserList };

// export default Users;
