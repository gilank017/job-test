export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'job-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { 
        rel: 'icon', 
        type: 'image/x-icon', 
        href: '/favicon.ico' 
      },
      { 
        rel: 'stylesheet', 
        type: 'text/css', 
        href: '/css/bootstrap.min.css' 
      }
    ],
    script: [
      {
        src: '/js/jquery.min.js',
      },
      {
        src: '/js/bootstrap.bundle.min.js',
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: process.env.API_URL || 'http://localhost:8000',
    // proxyHeaders: false,
    // credentials: false
    baseURL: '/',
    proxy: true
  },

  proxy: {
    '/api/': { target: 'http://localhost:8000', pathRewrite: {'^/api/': ''}, changeOrigin: true }
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
