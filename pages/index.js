import Head from 'next/head'
import { Grid, GridColumn } from '@progress/kendo-react-grid'
import { Button } from '@progress/kendo-react-buttons'

import { source } from '../smee/config'

export async function getStaticProps() {
  return {
    props: { showCreateAppButton: !process.env.APP_ID },
  }
}

export default function Home({ showCreateAppButton }) {
  const settings = {
    name: 'Serverless App Platform',
    url: 'https://www.example.com', // The homepage for your App's website
    hook_attributes: {
      url: source,
    },
    redirect_url: 'http://localhost:3000/github',
    callback_urls: ['http://localhost:3000/new'],
    public: true,
    default_permissions: {
      contents: 'read',
    },
    default_events: ['push'],
  }

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showCreateAppButton && (
        <>
          <form action="https://github.com/settings/apps/new" method="post">
            <input
              type="hidden"
              id="manifest"
              name="manifest"
              value={JSON.stringify(settings)}
            ></input>
            <Button type="submit">Create GitHub App</Button>
          </form>
        </>
      )}
      {!showCreateAppButton && (
        <>
          <h1>Services </h1>
          <Grid style={{ width: '55rem' }} data={[]}>
            <GridColumn field="Name" />
            <GridColumn
              field="Url"
              cell={(props) => (
                <td>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={props.field}
                  >
                    {props.field}
                  </a>
                </td>
              )}
            />
          </Grid>
        </>
      )}
    </>
  )
}
