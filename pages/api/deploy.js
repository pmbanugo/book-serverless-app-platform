import { transformEnvironmentVariables } from '../../util/env'
import { addEnv, addService } from '../../repository'

export default async function handler(req, res) {
  const data = req.body
  const tektonService = process.env.TEKTON

  const env = transformEnvironmentVariables(data.environmentVariables)

  // Send data to the Tekton pipeline
  await axios.post(tektonService, {
    ...data,
    environmentVariables: env,
  })
  console.log(`Deployed ${data.serviceName}`)

  await addService(data)
  await addEnv(data)
}
