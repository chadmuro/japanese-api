import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    unique: [true, 'This username is already taken'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
  },
  role: {
    type: String,
    default: 'basic',
  },
});

export default mongoose.model('User', userSchema);
