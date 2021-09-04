import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
const vocabularyController = require('../controllers/vocabularyController');
const Vocabulary = require('../models/vocabulary');
import { IVocabulary } from '../constants/types';

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

// create type for custom middleware response
export interface GetVocabularyResponse extends Response {
  vocabulary?: IVocabulary;
}

// Middleware
async function getVocabulary(
  req: Request,
  res: GetVocabularyResponse,
  next: NextFunction
) {
  let vocabulary;
  try {
    vocabulary = await Vocabulary.findById(req.params.id);
    console.log(vocabulary);
    if (vocabulary == null) {
      return res.status(404).json({ message: 'Cannot find vocabulary' });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
  res.vocabulary = vocabulary;
  next();
}

module.exports = router;
