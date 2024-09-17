<template>
  <li
    class="carousel__slide"
    :style="{ aspectRatio, width, height }"
  >
    <Photo
      v-bind="$attrs"
      class-wrapper="carousel__slide-photo"
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
// eslint-disable-next-line vue/no-dupe-keys
const width = computed(() => aspectRatio.value > 1 ? '100%' : 'auto')
// eslint-disable-next-line vue/no-dupe-keys
const height = computed(() => aspectRatio.value > 1 ? 'auto' : '100%')
</script>

<style scoped lang="scss">
.carousel__slide {
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  list-style: none;
  user-select: none;
  pointer-events: none;
  * {
    pointer-events: all;
  }
  &--visible {
    display: flex;
    z-index: 1;
  }
}

:deep(.carousel__slide-photo) {
  max-height: calc(100dvh - 20px * 2);
  background-color: #fff;
  box-shadow: 0px 0px 20px 1px #cacaca;
  border: 8px solid #fff;
  & > * {
    flex-basis: 100%;
  }
  @media screen and (min-width: 768px) {
    border-width: 20px;
  }
}
</style>
