import axios from 'axios'
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
    revision: data.branch,
  })
  console.log(`Deployed ${data.serviceName}`)

  await addService(data)
  await addEnv(data)
  res.status(200).end()
}
