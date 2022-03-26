import { readonly, ref } from 'vue';
import { PetData } from '../types/Pet';
import rawPets from '../mocks/pets.json';

const pets = ref<PetData[]>([]);

export default () => {
  const fetch = async () => {
    pets.value = rawPets.map((pet, index) => ({
      ...pet,
      id: index,
    }));
  }

  return {
    pets: readonly(pets),
    fetch,
  }
}
