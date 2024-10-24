<template>
  <li
    class="carousel__slide"
    :class="{ 'carousel__slide--visible': $attrs.class?.includes('carousel__slide--visible') }"
  >
    <Photo
      v-bind="$attrs"
      class="carousel__slide-photo"
      :aspect-ratio="aspectRatio"
      :is-carousel="true"
      loading="lazy"
    />
  </li>
</template>

<script setup>
import { computed } from 'vue'
import Photo from './Photo.vue'

const props = defineProps({
  width: {
    type: [String, Number],
    required: true,
  },
  height: {
    type: [String, Number],
    required: true,
  },
})

const aspectRatio = computed(() => Number(props.width) / Number(props.height))
</script>

<style scoped lang="scss">
.carousel__slide {
  position: absolute;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  &--visible {
    display: flex;
    opacity: 1;
  }
}

:deep(.carousel__slide-photo) {
  object-fit: contain;
  background-color: white;
  border: 2px solid white;
  box-shadow: 0 0 10px 1px #cacaca;

  @media (min-width: 768px) {
      max-height: calc(100dvh - 20px * 2);
  }
}
</style>
