<template>
  <BaseCard
    v-draggable
    tabindex="0"
    @onelementdropped="handleDropped"
    @onelementdragstarted="handleDragStarted"
  >
    <template #image>
      <PetImage :src="pet.image" />
    </template>

    <template #header>
      {{ getName(pet) }}
    </template>

    <template #description>
      <RateDisplay
        :rate="pet.adaptability"
        data-cypress="adaptability-rate"
      >
        Adaptability
      </RateDisplay>
      <RateDisplay
        :rate="pet.maintenance"
        inverted
        data-cypress="maintenance-rate"
      >
        Maintenance
      </RateDisplay>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import PetImage from './PetImage.vue';
import {PetData} from '../types/Pet';
import {getName} from '../services/petsHelpers';
import usePetCollections from '../services/usePetCollections';
import RateDisplay from "./RateDisplay.vue";
import BaseCard from "./BaseCard.vue";

const props = defineProps<{
  pet: PetData
}>();

const {addToActiveCollection, removeFromCollection} = usePetCollections();

const handleDropped = () => {
  addToActiveCollection(props.pet);
}

const handleDragStarted = () => {
  removeFromCollection(props.pet);
}
</script>
