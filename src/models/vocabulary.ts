import mongoose from 'mongoose';

const vocabularySchema = new mongoose.Schema({
  japanese: {
    type: String,
    required: true,
    unique: true,
  },
  english: {
    type: String,
    required: true,
  },
  reading: {
    type: String,
    required: true,
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model('Vocabulary', vocabularySchema);
