import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => { // Because mongoose _id is not standard naming convention for id attribute
      ret.id = ret._id;

      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

schema.pre('save', async function (done) { // Middleware to hash password on save if password is modified
  if(this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  };
  done();
});

const User = mongoose.model<UserDoc, UserModel>('users', schema);

export { User };
