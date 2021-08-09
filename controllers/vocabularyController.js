const Vocabulary = require('../models/vocabulary');
// vocabulary_get_all, vocabulary_get, vocabulary_post, vocabulary_patch, vocabulary_delete

const vocabulary_get_all = async (req, res) => {
	try {
		const vocabulary = await Vocabulary.find();
		res.send(vocabulary);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const vocabulary_get = async (req, res) => {
	res.json(res.vocabulary);
};

const vocabulary_post = async (req, res) => {
	const vocabulary = new Vocabulary({
		japanese: req.body.japanese,
		english: req.body.english,
		reading: req.body.reading,
	});
	try {
		const newVocabulary = await vocabulary.save();
		res.status(201).json(newVocabulary);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const vocabulary_patch = async (req, res) => {
	if (req.body.japanese != null) {
		res.vocabulary.japanese = req.body.japanese;
	}
	if (req.body.english != null) {
		res.vocabulary.english = req.body.english;
	}
	if (req.body.reading != null) {
		res.vocabulary.reading = req.body.reading;
	}
	try {
		const updatedVocabulary = await res.vocabulary.save();
		res.json(updatedVocabulary);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const vocabulary_delete = async (req, res) => {
	try {
		await res.vocabulary.remove();
		res.json({ message: 'Deleted vocabulary' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	vocabulary_get_all,
	vocabulary_get,
	vocabulary_post,
	vocabulary_patch,
	vocabulary_delete,
};
