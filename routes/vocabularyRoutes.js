const express = require('express');
const router = express.Router();
const vocabularyController = require('../controllers/vocabularyController');

// GET ALL
router.get('/', vocabularyController.vocabulary_get_all);

// GET ONE
router.get('/:id', getVocabulary, vocabularyController.vocabulary_get);

// CREATE ONE
router.post('/', vocabularyController.vocabulary_post);

// UPDATE ONE
router.patch('/:id', getVocabulary, vocabularyController.vocabulary_patch);

// DELETE ONE
router.delete('/:id', getVocabulary, vocabularyController.vocabulary_delete);

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
