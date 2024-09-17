<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    :class="['wrapper', props.classWrapper]"
    :style="{ aspectRatio }"
  >
    <img
      :src="props.src"
      :width="widthPlaceholder"
      :height="heightPlaceholder"
      class="placeholder"
      alt=""
      loading="eager"
      quality="10"
    >
    <img
      v-bind="props"
      :pictureAttributes="{ style: 'height: 100%; min-height: 100%; max-width: 100%;' }"
    >
    <slot name="loading">
      <Loading />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import Loading from './Loading.vue'

interface Props {
  src: string
  alt: string
  aspectRatio?: number
  classWrapper?: string
  isCarousel?: boolean
  width: number
  height: number
}

const props = defineProps<Props>()

const aspectRatio = props.aspectRatio ?? props.width / props.height
const widthPlaceholder = Math.max(Math.floor(props.width / 100), 5)
const heightPlaceholder = Math.max(Math.floor(props.height / 100), 5 * aspectRatio)

onMounted(() => {
  const image = document.querySelector('picture img') as HTMLImageElement
  const placeholder = document.querySelector('.placeholder') as HTMLImageElement
  const loading = document.querySelector('.loading')

  if (image && placeholder) {
    const isComplete = image.complete

    if (isComplete) {
      loading?.classList.add('loading--hidden')
      placeholder.classList.add('placeholder--hidden')
    }
    else {
      loading?.classList.remove('loading--hidden')
      image.onload = () => {
        placeholder.classList.add('placeholder--hidden')
        loading?.classList.add('loading--hidden')
      }
    }
  }
})
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  display: block;
  min-width: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden; // Safari fix
  @media screen and (min-width: 768px) {
    border-width: 20px;
  }
  .placeholder {
    position: absolute;
    inset: 0;
    opacity: 1;
    visibility: visible;
    transition: opacity 0.25s ease-in;
    &--hidden {
      opacity: 0;
    }
  }
  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
}
</style>
