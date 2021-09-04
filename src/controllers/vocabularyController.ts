import { Request, Response } from 'express';
import { GetVocabularyResponse } from '../routes/vocabularyRoutes';
const Vocabulary = require('../models/vocabulary');

const vocabulary_get_all = async (req: Request, res: Response) => {
  try {
    const vocabulary = await Vocabulary.find();
    res.send(vocabulary);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const vocabulary_get = async (req: Request, res: GetVocabularyResponse) => {
  res.json(res.vocabulary);
};

const vocabulary_post = async (req: Request, res: Response) => {
  const vocabulary = new Vocabulary({
    japanese: req.body.japanese,
    english: req.body.english,
    reading: req.body.reading,
    categories: req.body.categories,
  });
  try {
    const newVocabulary = await vocabulary.save();
    res.status(201).json(newVocabulary);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const vocabulary_patch = async (req: Request, res: GetVocabularyResponse) => {
  if (req.body.japanese != null && res.vocabulary) {
    res.vocabulary.japanese = req.body.japanese;
  }
  if (req.body.english != null && res.vocabulary) {
    res.vocabulary.english = req.body.english;
  }
  if (req.body.reading != null && res.vocabulary) {
    res.vocabulary.reading = req.body.reading;
  }
  if (req.body.categories != null && res.vocabulary) {
    res.vocabulary.categories = req.body.categories;
  }
  try {
    if (res.vocabulary) {
      const updatedVocabulary = await res.vocabulary.save();
      res.json(updatedVocabulary);
    }
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const vocabulary_delete = async (req: Request, res: GetVocabularyResponse) => {
  try {
    if (res.vocabulary) {
      await res.vocabulary.remove();
      res.json({ message: 'Deleted vocabulary' });
    }
  } catch (err: any) {
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
