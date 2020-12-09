/** @format */

import mongoose from 'mongoose';

interface AdminAttrs {
	email: string;
	phoneNr?: string;
	publicKey: string;
	name: {
		first: string;
		last: string;
	};
}

interface AdminModel extends mongoose.Model<AdminDoc> {
	build(attrs: AdminAttrs): AdminDoc;
}

interface AdminDoc extends mongoose.Document {
	email: string;
	phoneNr?: string;
	publicKey: string;
	name: {
		first: string;
		last: string;
	};
}

const schema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		phoneNr: {
			type: String,
			required: false,
		},
		name: {
			first: {
				type: String,
				required: true,
			},
			last: {
				type: String,
				required: true,
			},
		},
		publicKey: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform: (doc, ret) => {
				ret.id = ret._id;

				delete ret._id;
				delete ret.key;
			},
		},
	},
);

schema.statics.build = (attrs: AdminAttrs) => {
	// Logic to check key pair.

	return new Admin(attrs);
};

const Admin = mongoose.model<AdminDoc>('admins', schema);

export { Admin };
