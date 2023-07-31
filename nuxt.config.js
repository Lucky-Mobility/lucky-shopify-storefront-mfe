const MF = require('mf-webpack4')

export default {
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'pinia-example-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.css'],

  plugins: [
    '~/plugins/test.js',
    // Other plugins...
    // { src: '~/plugins/luckyLocalPlugin.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
    // set `disableVuex` to false if you need to use Vuex alongside Pinia
    ['@pinia/nuxt', { disableVuex: true }],
  ],
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.plugins.push(
          new MF({
            name: 'webpackHost',
            filename: 'remoteEntry.js',
            remotes: {
              luckyLocal: `promise import("${process.env.LUCKY_LOCAL_APP_SCRIPT_SRC}")`,
            },
          })
        )
      }
    },
  },
  serverMiddleware: [
    {
      path: process.env.LUCKY_BASE_PROXY_URL, //because we're using self-host is also path 
      handler: '~/server-middleware/lucky-ext-api-proxy.js',
    },
  ],
  publicRuntimeConfig: {
    luckyBaseProxyUrl: process.env.LUCKY_BASE_PROXY_URL,
  },
  privateRuntimeConfig: {},
}
