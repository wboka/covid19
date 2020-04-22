import axios from 'axios'
const pkg = require('../package.json')

export default ({ context, route }) => {
  axios.post(`api/stats`, {
    appName: pkg.name,
    appVersion: pkg.version,
    isServer: process.server,
    page: route.fullPath,
    pageName: route.name,
    host: location.host ? location.host : 'Unknown',
    userAgent: process.server
      ? context.req.headers['user-agent']
      : navigator.userAgent || 'Unknown',
    when: new Date().toUTCString()
  })
}
