const SmeeClient = require('smee-client')
export const source = 'https://smee.io/YndHjh3o5XUPhNoK'

const smee = new SmeeClient({
  source,
  target: 'http://localhost:3000/api/github/webhooks',
  logger: console,
})

smee.start()
