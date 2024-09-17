import { defineNuxtModule, addPlugin, addComponentsDir, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export type ModuleOptions = object

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-carousel',
    configKey: 'nuxtCarousel',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    // components
    // Register components
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      pathPrefix: false,
      prefix: '',
      global: true,
    })
  },
})
