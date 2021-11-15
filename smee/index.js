const closeWithGrace = require('close-with-grace')
const SmeeClient = require('smee-client')
const { source } = require('./config.js')

const smee = new SmeeClient({
  source,
  target: 'http://localhost:3000/api/github/webhooks',
  logger: console,
})

const events = smee.start()

closeWithGrace({ delay: 500 }, ({ err }) => {
  if (err) {
    console.error(err)
  }

  events.close()
})
