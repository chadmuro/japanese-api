import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    unique: [true, 'This username is already taken'],
    lowercase: true,
    minLength: [6, 'Username must be at least 6 characters'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minLength: [6, 'Password must be at least 6 characters'],
  },
  role: {
    type: String,
    default: 'basic',
  },
});

export default mongoose.model('User', userSchema);
