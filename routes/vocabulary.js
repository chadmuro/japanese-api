const express = require('express');
const router = express.Router();
const Vocabulary = require('../models/vocabulary');

// GET ALL
router.get('/', async (req, res) => {
	try {
		const vocabulary = await Vocabulary.find();
		res.send(vocabulary);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET ONE
router.get('/:id', getVocabulary, (req, res) => {
	res.json(res.vocabulary);
});

// CREATE ONE
router.post('/', async (req, res) => {
	const vocabulary = new Vocabulary({
		japanese: req.body.japanese,
		english: req.body.english,
	});
	try {
		const newVocabulary = await vocabulary.save();
		res.status(201).json(newVocabulary);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// UPDATE ONE
router.patch('/:id', getVocabulary, async (req, res) => {
	if (req.body.japanese != null) {
		res.vocabulary.japanese = req.body.japanese;
	}
	if (req.body.english != null) {
		res.vocabulary.english = req.body.english;
	}
	try {
		const updatedVocabulary = await res.vocabulary.save();
		res.json(updatedVocabulary);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// DELETE ONE
router.delete('/:id', getVocabulary, async (req, res) => {
	try {
		await res.vocabulary.remove();
		res.json({ message: 'Deleted vocabulary' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Middleware
async function getVocabulary(req, res, next) {
	let vocabulary;
	try {
		vocabulary = await Vocabulary.findById(req.params.id);
		console.log(vocabulary);
		if (vocabulary == null) {
			return res.status(404).json({ message: 'Cannot find vocabulary' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.vocabulary = vocabulary;
	next();
}

module.exports = router;
