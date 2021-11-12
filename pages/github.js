import axios from 'axios'
import { writeFile } from 'fs/promises'
import { source } from '../smee'

export async function getServerSideProps({ query }) {
  let succeeded = false
  if (query?.code) {
    try {
      const { data } = await axios.post(
        `https://api.github.com/app-manifests/${query.code}/conversions`
      )

      const env = `APP_ID=${data.id}
WEBHOOK_PROXY_URL=${source}
WEBHOOK_SECRET=${data.webhook_secret}
GITHUB_CLIENT_ID=${data.client_id}
GITHUB_CLIENT_SECRET=${data.client_secret}
PRIVATE_KEY="${data.pem}"
`
      await writeFile(`${process.cwd()}/.env.local`, env)
      succeeded = true
    } catch (error) {
      console.error('Error creating GitHub App ' + error.message)
    }
  }
  return { props: { succeeded } }
}

export default ({ succeeded }) =>
  succeeded ? (
    <h1>Your GitHub App has been created</h1>
  ) : (
    <h2>Failed to create GitHub App</h2>
  )
