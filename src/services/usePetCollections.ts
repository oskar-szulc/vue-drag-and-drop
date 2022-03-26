import {ActiveCollection} from '../types/App';
import {computed, Ref} from 'vue';
import {PetData} from '../types/Pet';
import {ref} from 'vue';
import {load, save} from "./storage";

const availablePets = ref<PetData[]>([]);
const favorites = ref<PetData[]>([]);
let activeCollection: ActiveCollection = null;
let indexCandidate = -1;
const favoritesStorageKey = 'favorites';

export default () => {
  const init = (pets: PetData[]) => {
    favorites.value = [];
    availablePets.value = pets;
  }

  const filterOutSelectedPet = (collection: Ref<PetData[]>, pet: PetData) => {
    return collection.value.filter(collectionPet => collectionPet.id !== pet.id);
  }

  const addToCollectionWithIndexCandidate = (primaryCollection: Ref<PetData[]>, secondaryCollection: Ref<PetData[]>, pet: PetData, index: number) => {
    primaryCollection.value = filterOutSelectedPet(primaryCollection, pet);
    secondaryCollection.value = filterOutSelectedPet(secondaryCollection, pet);

    if (index >= 0) {
      primaryCollection.value.splice(index, 0, pet);
    } else {
      primaryCollection.value.push(pet);
    }
  }

  const addToActiveCollection = (pet: PetData) => {
    if (activeCollection === 'available') {
      addToCollectionWithIndexCandidate(availablePets, favorites, pet, indexCandidate);
    } else if (activeCollection === 'favorites') {
      addToCollectionWithIndexCandidate(favorites, availablePets, pet, indexCandidate);
    }
  }

  const removeFromCollection = (pet: PetData) => {
    favorites.value = favorites.value.filter(petToStay => petToStay.id !== pet.id);
    availablePets.value = availablePets.value.filter(petToStay => petToStay.id !== pet.id);
  };

  const setFavoritesAsActive = () => {
    activeCollection = 'favorites';
  };

  const setAvailableAsActive = () => {
    activeCollection = 'available';
  };

  const resetActiveCollection = () => {
    activeCollection = null;
  };

  const setIndexCandidate = (index: number) => {
    indexCandidate = index;
  };

  const saveFavorites = () => {
    save(favoritesStorageKey, favorites.value);
  };

  const resetFavorites = () => {
    availablePets.value.push(...favorites.value);
    favorites.value = [];
  }

  const restoreFavorites = () => {
    const loadedFavorites = load(favoritesStorageKey) as PetData[];
    if(loadedFavorites) {
      availablePets.value.push(...favorites.value);
      favorites.value = loadedFavorites;
      loadedFavorites.forEach((favorite: PetData) => availablePets.value = filterOutSelectedPet(availablePets, favorite));
    }
  };

  const placeholderPet: PetData = {
    adaptability: 1,
    id: -1,
    image: new URL('https://via.placeholder.com/300x200'),
    maintenance: 1,
    type: 'placeholder',
    breed: null,
    species: null,
  };

  return {
    favorites: computed<PetData[]>(() => favorites.value),
    availablePets: computed<PetData[]>(() => availablePets.value),
    addToActiveCollection,
    removeFromCollection,
    setFavoritesAsActive,
    setAvailableAsActive,
    resetActiveCollection,
    setIndexCandidate,
    init,
    placeholderPet,
    saveFavorites,
    restoreFavorites,
    resetFavorites,
  }
}
