const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const PORT = process.env.PORT || 3000
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true) //parse signature is deprecated
    const { pathname, query } = parsedUrl

    if (pathname === '/api/github/webhooks') {
      //TODO: Handle GitHub Webhook
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on port ${PORT}`)
    console.log(
      `ready - started server on 0.0.0.0:3000, url: http://localhost:3000`
    )
  })
})
