const SmeeClient = require('smee-client')
const { source } = require('./config.js')

const smee = new SmeeClient({
  source,
  target: 'http://localhost:3000/api/github/webhooks',
  logger: console,
})

smee.start()
