// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    baseURL: '/gabfroggoprojects/', // Base URL para GitHub Pages
    buildAssetsDir: '/gabfroggoprojects/_nuxt/', // Asegurar que los assets tengan el path correcto
    // baseURL: '/', // Base URL para GitHub Pages
    // buildAssetsDir: '/_nuxt/', // Asegurar que los assets tengan el path correcto ????
  },

  nitro: {
    preset: 'static'
  },

  generate: {
    routes: [
      '/index',
      '/make',
      '/tos',
    ],
  },

  css: [
    './assets/css/global.css',
    './assets/css/make.css',
    './assets/css/start.css',
    './assets/css/tos.css',
  ],
})