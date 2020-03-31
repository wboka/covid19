const pkg = require('../package.json')

export default function({ req, route }) {
  const pageDetails = {
    page: route.fullPath,
    pageName: route.name,
    appName: pkg.name,
    appVersion: pkg.version,
    isServer: process.server,
    userAgent: process.server ? req.headers['user-agent'] : navigator.userAgent
  }

  // eslint-disable-next-line
  console.log(pageDetails)

  return true
}
