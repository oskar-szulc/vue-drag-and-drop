import { Language } from "../types/App";

const english: { [key: string]: string } = {
  'golden-retriever': 'Golden Retriever',
  'german-shepherd': 'German Shepherd',
  'british-short-hair': 'British Short Hair',
  'persian': 'Persian',
  'bulldog': 'Bulldog',
  'pomeranian': 'Pomeranian',
  'siamese': 'Siamese',
  'main-coon': 'Main Coon',
  'scottish-fold': 'Scottish Fold',
  'parrot': 'Parrot',
  'finch': 'Finch',
  'love-bird': 'Love Bird',
  'dog': 'Dog',
  'cat': 'Cat',
  'bird': 'Bird',
};

const languages = {
  'en': english,
}

let defaultLanguage: Language | undefined;

export const getTranslation = (lang: Language = 'en', key: string) => {
  const dict = languages[lang];

  const value = dict[key];
  if(value) return value;

  return '';
};

export const $t = (key: string, plural = false) => {
  const translation = getTranslation(defaultLanguage, key);
  if(translation && plural) {
    return `${translation}s`;
  }

  return translation;
}

export const setLanguage = (language: Language) => {
  defaultLanguage = language;
}
