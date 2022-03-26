export type PetType =  'dog' | 'cat' | 'bird' | 'placeholder';
export type PetBreed = 'golden-retriever' | 'german-shepherd' | 'british-short-hair' | 'persian' | 'bulldog' | 'pomeranian' | 'siamese' | 'main-coon' | 'scottish-fold';
export type PetSpecies ='parrot' | 'finch' | 'love-bird';
export type PetAdaptability = 1 | 2 | 3 | 4 | 5;
export type PetMaintenance = 1 | 2 | 3 | 4 | 5;

export type PetData = {
  id: number,
  adaptability: PetAdaptability,
  breed: PetBreed | null,
  species: PetSpecies | null,
  image: URL,
  maintenance: PetMaintenance,
  type: PetType,
};