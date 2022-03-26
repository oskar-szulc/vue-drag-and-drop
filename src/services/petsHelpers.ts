import {PetData} from "../types/Pet";
import {$t} from '../services/translations';

export const getName = (pet: PetData): string => {
  if (pet.breed) return $t(pet.breed);
  if (pet.species) return $t(pet.species);

  return pet.type;
}

export const sortBy = (sortByAdaptability: boolean, sortByMaintainability: boolean) => (pet1: PetData, pet2: PetData) => {
  if (sortByMaintainability && !sortByAdaptability) {
    return pet1.maintenance > pet2.maintenance ? 1 : pet1.maintenance === pet2.maintenance ? 0 : -1;
  } else if (!sortByMaintainability && sortByAdaptability) {
    return pet1.adaptability > pet2.adaptability ? -1 : pet1.adaptability === pet2.adaptability ? 0 : 1;
  } else if (sortByMaintainability && sortByAdaptability) {
    const score1 = pet1.adaptability + (6 - pet1.maintenance);
    const score2 = pet2.adaptability + (6 - pet2.maintenance);

    return score1 > score2 ? -1 : score1 === score2 ? 0 : 1;
  } else return pet1.id > pet2.id ? 1 : pet1.id === pet2.id ? 0 : -1;
}
