import axios from 'axios'

const dyanamicRoutes = async () => {
  const { data: states } = await axios.get(
    'https://covidtracking.com/api/v1/states/info.json'
  )

  const allStates = states.map((state) => {
    return `/us/${state.state}`
  })
  const allStatesFallen = states.map((state) => {
    return `/us/${state.state}/fallen`
  })

  return [...allStates, ...allStatesFallen]
}

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
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],
  axios: {},
  env: {
    MONGO_URI: process.env.MONGO_URI
  },
  build: {
    extend(config, ctx) {}
  },
  generate: {
    routes: dyanamicRoutes
  },
  router: {
    middleware: ['pageHit']
  }
}
