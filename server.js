const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })
const { connect, getService } = require('./repository.js')
const { App } = require('octokit')
const axios = require('axios').default

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(connect)
  .then(() => {
    const PORT = process.env.PORT || 3000
    const appId = process.env.APP_ID
    const privateKey = process.env.PRIVATE_KEY
    const webhooksSecret = process.env.WEBHOOK_SECRET
    const gitHubApp = new App({
      appId,
      privateKey,
      webhooks: { secret: webhooksSecret },
    })

    gitHubApp.webhooks.on('push', async ({ payload }) => {
      const installationId = payload.installation.id
      const repoUrl = payload.repository.html_url
      const branch = payload.ref.split('/')[2]
      //get service details from mongodb
      const service = await getService(installationId, repoUrl)

      //verify that the ref matches the branch we need to deploy.
      if (service.branch == branch) {
        const tektonPayload = {
          repoUrl,
          revision: payload.head_commit.id,
          sourceDirectory: service.sourceDirectory ?? '',
          serviceName: service.serviceName,
        }

        await axios.post(process.env.TEKTON, tektonPayload)
      }
    })

    createServer(async (req, res) => {
      const parsedUrl = parse(req.url, true) //parse signature is deprecated
      const { pathname, query } = parsedUrl

      if (pathname === '/api/github/webhooks') {
        const payload = await getRequestBody(req)
        await gitHubApp.webhooks.verifyAndReceive({
          id: req.headers['x-github-delivery'],
          name: req.headers['x-github-event'],
          signature: req.headers['x-hub-signature-256'],
          payload: payload,
        })
        res.statusCode = 200
        res.end()
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

async function getRequestBody(req) {
  const buffers = []
  for await (const chunk of req) {
    buffers.push(chunk)
  }
  const data = Buffer.concat(buffers).toString()

  return JSON.parse(data)
}
