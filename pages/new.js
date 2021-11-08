import Link from 'next/link'
import { useState } from 'react'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import { filterBy } from '@progress/kendo-data-query'

export default function NewApp({ repos }) {
  const filterChange = ({ filter }) => {
    setData(filterBy(repos.slice(), filter))
  }

  return (
    <>
      <h2>Select the GitHub repository you want to deploy</h2>
      <div className="info">
        Can't see your repository here?{' '}
        <Link href="https://github.com/apps/tekton-kn-app/installations/new">
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
