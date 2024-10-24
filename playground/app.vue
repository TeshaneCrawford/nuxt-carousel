<template>
  <div>
    <main>
      <div class="entry">
        <Carousel :images="images" />
        <ul
          id="carouselTargetList"
          class="entry__entries"
        >
          <li
            v-for="(img, i) in images"
            :key="i"
            class="entry__elem"
          >
            <NuxtLink
              :to="`/?image=${i}`"
              :data-carousel-index="i"
              class="entry__link"
            >
              <Photo v-bind="img" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
interface CarouselImage {
  src: string
  alt: string
  width: number
  height: number
  widths: number[]
}

const images: CarouselImage[] = [
  {
    src: 'https://a.storyblok.com/f/95455/1350x1080/3ef7748922/p5240368.jpg',
    alt: '',
    width: 1350,
    height: 1080,
    widths: [200, 675, 1350],
  },
  {
    src: 'https://a.storyblok.com/f/95455/1350x1080/231d2407ea/p4030184.jpg',
    alt: '',
    width: 1350,
    height: 1080,
    widths: [200, 675, 1350],
  },
  {
    src: 'https://a.storyblok.com/f/95455/1350x1080/4aee2a00f4/p5240221.jpg',
    alt: '',
    width: 1350,
    height: 1080,
    widths: [200, 675, 1350],
  },
  {
    src: 'https://a.storyblok.com/f/186233/1365x2048/3e6411d521/20230714-1.jpg',
    alt: '',
    width: 1280,
    height: 1920,
    widths: [200, 675, 1350],
  },
]

useHead({
  title: 'Welcome to Nuxt 3',
})
</script>

<style lang="scss" scoped>
.entry {
  &__entries {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &__elem {
    &:hover {
      cursor: pointer;
    }
  }
  &__img {
    object-fit: contain;
    object-position: center;
    width: 100%;
    min-height: 100%;
  }
  &__link {
    display: block;
  }
}
</style>
