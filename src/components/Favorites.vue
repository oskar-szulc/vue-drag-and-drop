<template>
  <section>
    <Header class="text-2xl">
      Favorites
    </Header>
    <Subheader>
      <BaseButton
        :disabled="favorites.length === 0"
        @click="saveFavorites"
      >
        Save
      </BaseButton>
      <BaseButton @click="restoreFavorites">
        Restore
      </BaseButton>
      <DangerButton @click="resetFavorites">
        Reset
      </DangerButton>
    </Subheader>
    <CardsGroup
      id="favorites"
      v-drop-target
      style="min-height: 10rem"
      @onelementdragging="handleDragging"
      @onelementdragleave="handleDraggedOut"
    >
      <template
        v-for="(pet, index) in displayFavorites"
        :key="pet.id"
      >
        <PetCard
          v-if="pet.type !== 'placeholder'"
          card
          :pet="pet"
          :data-index="index"
        />
        <PlaceholderCard
          v-else
          card
          :data-index="index"
        />
      </template>
    </CardsGroup>
  </section>
</template>

<script setup lang="ts">
import {ref, watch, watchEffect} from 'vue';
import usePetCollections from '../services/usePetCollections';
import {PetData} from '../types/Pet';
import PetCard from './PetCard.vue';
import PlaceholderCard from './PlaceholderCard.vue';
import {getElementWithSelectorBelow} from '../services/native-dom.js'
import BaseButton from './BaseButton.vue';
import CardsGroup from "./CardsGroup.vue";
import Header from "./Header.vue";
import Subheader from "./Subheader.vue";
import DangerButton from "./DangerButton.vue";

let placeholderIndex = ref(-1);

const {favorites, placeholderPet, setFavoritesAsActive, resetActiveCollection, setIndexCandidate, saveFavorites, restoreFavorites, resetFavorites} = usePetCollections();
const displayFavorites = ref<PetData[]>([...favorites.value]);

watchEffect(() => {
  displayFavorites.value = favorites.value;
})

watch(
    () => placeholderIndex.value,
    (newValue) => {
      setIndexCandidate(newValue);
      if (newValue >= 0) {
        const cleanFavs = favorites.value.filter(fav => fav.type !== 'placeholder');
        cleanFavs.splice(newValue, 0, placeholderPet)
        displayFavorites.value = cleanFavs;
      } else if (newValue === -1) {
        displayFavorites.value = favorites.value.filter(fav => fav.type !== 'placeholder');
      }
    }
);

const handleDragging = (ev: CustomEvent) => {
  setFavoritesAsActive();

  const {clientX, clientY} = ev.detail.moveEvent;
  const cardBelow = getElementWithSelectorBelow({
                                                  draggedElement: ev.detail.draggedElement,
                                                  clientX,
                                                  clientY,
                                                  selector: '[card]'
                                                });

  if (cardBelow) {
    const cardBelowIndex = cardBelow.dataset.index;
    const draggedCardIndex = ev.detail.draggedElement.dataset.index;
    if (cardBelowIndex > draggedCardIndex)
      setPlaceholderIndex(cardBelowIndex - 1);
    else
      setPlaceholderIndex(cardBelowIndex);
  } else {
    const cards = document.querySelectorAll('[card]');
    if (cards.length > 0) {
      const lastCard = cards[cards.length - 1];
      const lastCardBottom = lastCard.getBoundingClientRect().bottom;
      if (lastCardBottom < clientY)
        setPlaceholderIndex(favorites.value.length);
      else
        setPlaceholderIndex(0);
    } else {
      setPlaceholderIndex(favorites.value.length);
    }
  }
}

const handleDraggedOut = () => {
  setPlaceholderIndex(-1);
  resetActiveCollection();
}

const setPlaceholderIndex = (index: number) => {
  if (index == undefined) return;
  placeholderIndex.value = index;
}
</script>

<style scoped>
#favorites[drop-candidate] {
  @apply shadow-blue-200 bg-blue-50 shadow-lg;
}
</style>
