import { useState } from 'react'
import Link from 'next/link'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import { filterBy } from '@progress/kendo-data-query'
import { serialize } from "../util/cookie";

export const getServerSideProps = async (context) => {
  return {
    props: { githubAppUrl: process.env.APP_URL },
  }
}

export default function NewApp({ repos, githubAppUrl, installationId }) {
  const filterChange = ({ filter }) => {}

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
              data={repos}
              filterable={true}
              onFilterChange={filterChange}
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
