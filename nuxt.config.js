export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Online Grading Sheets',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Do your grading sheets online!'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Nunito'
      },
      { rel: 'stylesheet', href: '/css/all.css' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#009688' },
  /*
   ** Global CSS
   */
  css: ['~/assets/w3.css', '~/assets/global.css', '~/assets/transitions.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/refresh_token.js', '~/plugins/axios'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'https://school.pythonanywhere.com'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
