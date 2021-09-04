export interface ICategory {
  _id: string;
  name: string;
}

export interface IVocabulary {
  _id: string;
  japanese: string;
  reading: string;
  english: string;
  createdDate: Date;
  categories: {
    _id: string;
    name: string;
  }[];
  save: any;
  remove: any;
}
