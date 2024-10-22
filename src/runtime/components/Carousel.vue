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
    ></div>
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
          ></path>
        </svg>
      </button>
      <div
        id="carousel__wrapper"
        class="carousel__wrapper"
      >
        <div class="carousel__main">
          <!-- Prev Link -->
          <a
            id="prevLink"
            class="carousel__button carousel__button--arrow"
            aria-label="Go to previous photo"
            @click.prevent="goToPrev"
          >
            <svg
              id="prev"
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
              ></path>
            </svg>
          </a>
          <!-- Slides -->
          <ul
            id="slides"
            class="carousel__slides"
          >
            <CarouselSlide
              v-for="(image, i) in images"
              :key="i"
              v-bind="image"
              :class="{ 'carousel__slide--visible': i === currentIdx }"
            />
          </ul>
          <!-- Next Link -->
          <a
            id="nextLink"
            class="carousel__button carousel__button--arrow carousel__button--right"
            aria-label="Go to next photo"
            @click.prevent="goToNext"
          >
            <svg
              id="next"
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
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CarouselSlide from './CarouselSlide.vue'
import { useRoute } from '#app'

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
  display: unset;
  background-color: rgba(250, 250, 250, 0.5);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  &[aria-hidden="true"] {
    display: none;
  }
  &,
  &__overlay {
    position: fixed;
    inset: 0;
    user-select: none;
    z-index: 1;
  }
  &--active {
    display: unset;
  }
  &__close {
    position: absolute;
    right: 0;
  }
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  &__main {
    display: grid;
    grid-template-columns: 0.25fr minmax(0, 100%) 0.25fr;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    @media screen and (min-width: 768px) {
      grid-template-columns: 0.25fr minmax(0, 0.9fr) 0.25fr;
    }
  }
  &__slides {
    padding: 0;
    margin: 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100% - 48px * 2);
  }
  &__button {
    width: 48px;
    height: 48px;
    border: none;
    background: none;
    margin: 1rem;
    padding: 0;
    color: var(--tertiary);
    z-index: 2;
    &:hover {
      cursor: pointer;
      color: var(--secondary);
    }
    &:focus-visible {
      outline: dashed 2px var(--primary);
    }
    &--right {
      justify-self: end;
      justify-content: flex-end;
    }
    &--arrow {
      display: flex;
      align-items: center;
      height: 50vh;
      margin: 0;
      @media screen and (min-width: 768px) {
        margin: 1rem;
      }
    }
  }
  &__svg {
    width: 24px;
    height: 24px;
    @media screen and (min-width: 768px) {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
