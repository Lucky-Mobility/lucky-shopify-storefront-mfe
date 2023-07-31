const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

const hasLuckyConfigs =
  process.env.LUCKY_EXT_API_URL &&
  process.env.LUCKY_PROXY_PATH &&
  process.env.LUCKY_API_KEY &&
  process.env.LUCKY_LOCAL_APP_SCRIPT_SRC

if (!hasLuckyConfigs) {
  console.warn(`WARNING: missing Lucky configs`)
}

const filter = function (pathname, req) {
  // return pathname.match('^/api') && req.method === 'GET';
  return hasLuckyConfigs && ['GET', 'POST'].includes(req.method)
}
app.use(
  '*',
  createProxyMiddleware(filter, {
    target: process.env.LUCKY_EXT_API_URL,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      // Log the path
      console.log(req.params['path'])
      console.log(process.env.LUCKY_EXT_API_URL)
      proxyReq.setHeader('x-forwarded-for', req.connection.remoteAddress)
      proxyReq.setHeader('Authorization', `Key ${process.env.LUCKY_API_KEY}`)
      // Log the headers
      console.log(proxyReq.getHeaders())
    },
  })
)

module.exports = app
