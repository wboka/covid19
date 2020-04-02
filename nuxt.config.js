import axios from 'axios'

export default {
  mode: 'spa',
  head: {
    titleTemplate: `%s | ${process.env.npm_package_name || ''}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Titillium+Web|Source+Sans+Pro&display=swap'
      },
      {
        rel: 'shortcut icon',
        href: '/favicon.ico'
      }
    ]
  },
  loading: { color: '#2a4365' },
  css: [],
  plugins: [],
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],
  axios: {},
  build: {
    extend(config, ctx) {}
  },
  generate: {
    routes() {
      return axios
        .get('https://covidtracking.com/api/states/info')
        .then((result) => {
          return result.data.map((state) => {
            return '/us/' + state.state
          })
        })
    }
  }
  // router: {
  //   middleware: 'stats'
  // }
}
