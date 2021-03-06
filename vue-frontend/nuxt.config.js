import themeFile from './plugins/theme'
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'playstation-trophies-web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Bubblegum+Sans&display=swap',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/chakra
    '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion',
    '@nuxtjs/apollo',
  ],
  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo-client.js',
    },
    credentials: 'include',
  },
  chakra: {
    extendTheme: themeFile,
    config: {
      /**
       * Setting this value to false disables
       * component auto-import in your Vue templates
       * @type {Boolean}
       **/
      autoImport: true,
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
