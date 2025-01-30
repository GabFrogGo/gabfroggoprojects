// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    baseURL: '/gabfroggoprojects/'
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