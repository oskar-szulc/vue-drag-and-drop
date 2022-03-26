import { PetData } from "./Pet";

export type Language = 'en'
export type TranslationFunc = (key: string) => string;
export type ActiveCollection = 'available' | 'favorites' | null;
export type EmptyPet = 'emptypet';
export type DisplayPet = PetData | EmptyPet;
export type StoredPreferencesObject = { [key:string ]: boolean};
