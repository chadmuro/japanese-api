const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	// vocabulary: [
	// 	{
	// 		type: Schema.Types.Vocabulary,
	// 	},
	// ],
});

module.exports = mongoose.model('Category', categorySchema);
