<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    id="carousel-dialog"
    :aria-hidden="!isOpen"
    class="carousel"
    aria-label="Carousel"
  >
    <div
      class="carousel__overlay"
      @click="close"
    />
    <div
      id="carousel"
      role="document"
    >
      <button
        id="closeButton"
        type="button"
        class="carousel__button carousel__close"
        aria-label="Close carousel"
        @click="close"
      >
        <svg
          class="carousel__svg"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div class="carousel__wrapper">
        <div class="carousel__main">
          <button
            class="carousel__button carousel__button--arrow"
            aria-label="Previous photo"
            @click="goToPrev"
          >
            <svg
              class="carousel__svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div class="carousel__content">
            <ul class="carousel__slides">
              <CarouselSlide
                v-for="(image, i) in images"
                :key="i"
                v-bind="image"
                :class="{ 'carousel__slide--visible': i === currentIdx }"
              />
            </ul>
          </div>

          <button
            class="carousel__button carousel__button--arrow"
            aria-label="Next photo"
            @click="goToNext"
          >
            <svg
              class="carousel__svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import CarouselSlide from './CarouselSlide.vue'
import { useRoute, useRouter } from '#imports'

interface CarouselImage {
  src: string
  alt: string
  width: number
  height: number
}

const props = defineProps<{
  images: CarouselImage[]
}>()

const route = useRoute()
const router = useRouter()

const isOpen = ref(false)
const currentIdx = ref(0)

const open = (index: number) => {
  document.documentElement.style.overflow = ''
  isOpen.value = true
  updateCarouselUrl(index)
}

const close = () => {
  document.documentElement.style.overflow = 'auto'
  isOpen.value = false
  updateCarouselUrl()
}

const goToPrev = () => {
  const index = getPrevIndex(currentIdx.value, props.images.length)
  updateCarouselUrl(index)
}

const goToNext = () => {
  const index = getNextIndex(currentIdx.value, props.images.length)
  updateCarouselUrl(index)
}

const updateCarouselUrl = (newIndex?: number) => {
  if (newIndex === undefined) {
    router.push({ query: {} })
  }
  else {
    router.push({ query: { image: newIndex.toString() } })
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!isOpen.value) return

  if (e.key === 'ArrowLeft') {
    goToPrev()
  }
  else if (e.key === 'ArrowRight') {
    goToNext()
  }
  else if (e.key === 'Escape') {
    close()
  }
}

watch(() => route.query.image, (newImageIndex) => {
  if (newImageIndex) {
    const index = Number.parseInt(newImageIndex as string, 10)
    currentIdx.value = index
    if (!isOpen.value) {
      open(index)
    }
  }
  else if (isOpen.value) {
    close()
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  if (route.query.image) {
    const index = Number.parseInt(route.query.image as string, 10)
    open(index)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

const getPrevIndex = (currentIndex: number, totalItems: number): number => {
  return currentIndex - 1 < 0 ? totalItems - 1 : currentIndex - 1
}

const getNextIndex = (currentIndex: number, totalItems: number): number => {
  return currentIndex + 1 > totalItems - 1 ? 0 : currentIndex + 1
}
</script>

<style scoped lang="scss">
.carousel {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(250, 250, 250, 0.5);
  backdrop-filter: blur(10px);

  &[aria-hidden="true"] {
    display: none;
  }

  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 1;
  }

  &__wrapper {
    position: relative;
    height: 100dvh;
    z-index: 2;
  }

  &__main {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    margin: auto;
  }

  &__content {
    flex-grow: 1;
    height: 100%;
    padding: 0;
    margin: auto;
  }

  &__slides {
    position: relative;
    height: 100%;
    margin: auto;
    padding: 0;
    list-style: none;
    @media (min-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 50dvw;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    padding: 0;
    border: none;
    background: none;
    color: var(--tertiary);
    z-index: 3;
    cursor: pointer;

    &:hover {
      color: var(--secondary);
    }

    &:focus-visible {
      outline: dashed 2px var(--primary);
    }

    &--arrow {
      flex-shrink: 0;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      margin: 0 12px;

      @media (min-width: 768px) {
        margin: 0 24px;
      }
    }
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 3;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
  }

  &__svg {
    width: 24px;
    height: 24px;

    @media (min-width: 768px) {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
