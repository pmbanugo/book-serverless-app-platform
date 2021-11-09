const SmeeClient = require('smee-client')

const smee = new SmeeClient({
  source: 'https://smee.io/YndHjh3o5XUPhNoK',
  target: 'http://localhost:3000/api/github/webhooks',
  logger: console,
})

smee.start()
