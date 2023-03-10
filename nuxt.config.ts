// https://nuxt.com/docs/api/configuration/nuxt-config

import glsl from 'vite-plugin-glsl';

export default defineNuxtConfig({
  runtimeConfig: {
    baseURL: process.env.BASE_URL
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_config.scss";',
        },
      },
    },
    plugins: [glsl()],
  },
  dev: process.env.NODE_ENV !== 'production',
})


