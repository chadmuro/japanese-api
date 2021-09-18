import { Document } from 'mongoose';

export interface ICategory extends Document {
  _id: string;
  name: string;
  vocabularies: {
    _id: string;
    name: string;
  }[];
}

export interface IVocabulary extends Document {
  _id: string;
  japanese: string;
  reading: string;
  english: string;
  createdDate: Date;
  categories: {
    _id: string;
    name: string;
  }[];
}
