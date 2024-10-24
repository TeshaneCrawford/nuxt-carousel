export default defineNuxtConfig({
  modules: ['../src/module'],
  css: [
    '@/assets/scss/main.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or "modern", "legacy"
          // additionalData: '@use "@/assets/styles/global.scss" as *;',
        },
      },
    },
    plugins: [
      // svgLoader({
      //   defaultImport: 'url',
      // }),
    ],
  },
  nuxtCarousel: {},
  devtools: { enabled: true },
  compatibilityDate: '2024-09-03',
})
