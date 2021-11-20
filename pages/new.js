import { useState } from 'react'
import Link from 'next/link'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import { filterBy } from '@progress/kendo-data-query'
import { serialize } from '../util/cookie'
import { parse } from 'cookie'
import { App } from 'octokit'
import { useRouter } from 'next/router'

export const getServerSideProps = async (context) => {
  const appId = process.env.APP_ID
  const privateKey = process.env.PRIVATE_KEY
  let repos = null

  // get installationId from cookie
  const cookies = parse(context.req.headers?.cookie || '')
  let installationId = cookies['installationId'] ?? null

  // get installationId from query string if there's none in the cookie
  if (!installationId && context.query.installation_id) {
    const cookie = serialize('installationId', context.query.installation_id)
    context.res.setHeader('Set-Cookie', cookie)
    installationId = context.query.installation_id
  }

  if (installationId && appId && privateKey) {
    const app = new App({
      appId,
      privateKey,
    })

    repos = []
    // Get the repositories the GitHub App has access to
    for await (const { repository } of app.eachRepository.iterator({
      installationId: Number.parseInt(installationId),
    })) {
      repos.push({
        owner: repository?.owner?.login,
        name: repository?.name,
        url: repository?.html_url,
      })
    }
  }

  return {
    props: { githubAppUrl: process.env.APP_URL, repos, installationId },
  }
}

export default function NewApp({ repos, githubAppUrl, installationId }) {
  const router = useRouter()
  const [data, setData] = useState(repos?.map((repo) => repo.name))

  const filterChange = ({ filter }) => {
    setData(
      filterBy(
        repos.map((repo) => repo.name),
        filter
      )
    )
  }

  const handleChange = (event) => {
    const repo = repos.find((repo) => repo.name === event?.target?.value)
    localStorage.setItem('selectedRepo', JSON.stringify(repo))
    router.push(`/deploy?repo=${repo.name}&owner=${repo.owner}`)
  }

  return (
    <>
      {!repos ? (
        <div>
          Get started by{' '}
          <Link href={`${githubAppUrl}/installations/new`}>
            <span className="k-button">
              connecting to your GitHub account/organsation
            </span>
          </Link>
        </div>
      ) : (
        <>
          <h2>Select the GitHub repository you want to deploy</h2>
          <div className="info">
            Can't see your repository here?{' '}
            <Link
              href={`https://github.com/settings/installations/${installationId}`}
            >
              <a>Configure the GitHub app permission</a>
            </Link>
          </div>
          <div>
            <DropDownList
              style={{ width: '26rem', margin: '1rem' }}
              data={data}
              filterable={true}
              onFilterChange={filterChange}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      <style jsx>
        {`
          a {
            color: #0070f3;
            text-decoration: none;
          }

          a:hover,
          a:focus,
          a:active {
            text-decoration: underline;
          }

          .info {
            font-style: italic;
          }
        `}
      </style>
    </>
  )
}
