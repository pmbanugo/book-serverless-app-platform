const mongoose = require('mongoose')
const mongoDbUrl = process.env.DB_URL

const connect = async () => {
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))

  await mongoose.connect(`${mongoDbUrl}/knative`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('connected to DB')
}

const servicesSchema = new mongoose.Schema({
  installationId: { type: String, required: true },
  serviceName: { type: String, required: true },
  repoUrl: { type: String, required: true },
  branch: { type: String, required: true },
  sourceDirectory: { type: String, required: false },
})

const environmentVariablesSchema = new mongoose.Schema({
  installationId: { type: String, required: true },
  repoUrl: { type: String, required: true },
  environmentVariables: {
    type: [{ key: String, value: String }],
    required: true,
  },
})

const Services =
  mongoose.models.Service || mongoose.model('Service', servicesSchema)

const EnvironmentVariables =
  mongoose.models.EnvironmentVariable ||
  mongoose.model('EnvironmentVariable', environmentVariablesSchema)

const addService = async (service) => {
  return await Services.create(service)
}

const getServices = async (installationId) => {
  return await Services.find({ installationId })
}

const getService = async (installationId, repoUrl) => {
  return await Services.findOne({ installationId, repoUrl })
}

const addEnv = async (env) => {
  return await EnvironmentVariables.create(env)
}

const getEnv = async (installationId, repoUrl) => {
  const env = await EnvironmentVariables.findOne({ installationId, repoUrl })
  return env.environmentVariables
}

module.exports = {
  connect,
  addService,
  getServices,
  getService,
  addEnv,
  getEnv,
}
