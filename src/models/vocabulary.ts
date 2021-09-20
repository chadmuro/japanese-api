import mongoose from 'mongoose';

const vocabularySchema = new mongoose.Schema({
  japanese: {
    type: String,
    required: [true, 'Please enter a Japanese vocabulary'],
    unique: true,
  },
  english: {
    type: String,
    required: [true, 'Please enter an English reading'],
  },
  reading: {
    type: String,
    required: [true, 'Please enter a Japanese reading'],
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model('Vocabulary', vocabularySchema);
