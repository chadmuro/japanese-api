import express, { Request, Response, NextFunction } from 'express';
import vocabularyController from '../controllers/vocabularyController';
import Vocabulary from '../models/vocabulary';
import { IVocabulary } from '../constants/types';

const router = express.Router();

// GET ALL
router.get('/', vocabularyController.vocabulary_get_all);

// GET ONE
router.get('/:id', getVocabulary, vocabularyController.vocabulary_get);

// CREATE ONE
router.post('/', vocabularyController.vocabulary_post);

// UPDATE ONE
router.put('/:id', getVocabulary, vocabularyController.vocabulary_put);

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
    if (vocabulary == null) {
      return res.status(404).json({ message: 'Cannot find vocabulary' });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
  res.vocabulary = vocabulary;
  next();
}

export default router;
