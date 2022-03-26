<template>
  <section>
    <Header class="text-2xl">
      Available pets
    </Header>
    <div>
      <Subheader>
        Sort by:
        <SwitchButton
          :enabled="sortByAdaptability"
          @click="sortByAdaptability = !sortByAdaptability"
        >
          high adaptability
        </SwitchButton>
        <SwitchButton
          :enabled="sortByMaintainability"
          @click="sortByMaintainability = !sortByMaintainability"
        >
          low maintenance
        </SwitchButton>
      </Subheader>
    </div>
    <section
      id="available"
      v-drop-target
      class="mt-2 transition-shadow duration-150 ease-in-out rounded-lg flex flex-col"
      @onelementdragging="handleDragging"
      @onelementdragleave="handleDraggedOut"
    >
      <template
        v-for="type in Object.keys(petsByType).sort()"
        :key="type"
      >
        <Header class="ml-4 mt-4">
          {{ $t(type, true) }}
        </Header>
        <CardsGroup
          data-cypress="pet-group"
          :data-cypress-secondary="`${type}-group`"
        >
          <PetCard
            v-for="pet in petsOfType(type)"
            :key="pet.id"
            :pet="pet"
          />
        </CardsGroup>
      </template>
    </section>
  </section>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {sortBy} from "../services/petsHelpers";
import {$t} from '../services/translations';
import usePetCollections from '../services/usePetCollections';
import {PetData} from "../types/Pet";
import PetCard from './PetCard.vue';
import SwitchButton from "./SwitchButton.vue";
import Header from "./Header.vue";
import Subheader from "./Subheader.vue";
import CardsGroup from "./CardsGroup.vue";

const {availablePets, setAvailableAsActive, resetActiveCollection} = usePetCollections();
const petsByType = computed<{ [key: string]: PetData[] }>(() =>
  availablePets.value.reduce((group: { [key: string]: PetData[] }, pet: PetData) => {
    const {type} = pet;
    group[type] = group[type] ?? [];
    group[type].push(pet);
    return group;
  }, {})
);
const sortByMaintainability = ref(false);
const sortByAdaptability = ref(false);

const handleDragging = () => {
  setAvailableAsActive();
}

const handleDraggedOut = () => {
  resetActiveCollection();
}

const petsOfType = (type: string): PetData[] => {
  return petsByType.value[type].sort(sortBy(sortByAdaptability.value, sortByMaintainability.value));
}
</script>

<style scoped>
#available[drop-candidate] {
  @apply shadow-blue-200 shadow-lg bg-blue-50;
}
</style>
