import Head from 'next/head'
import { Grid, GridColumn } from '@progress/kendo-react-grid'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Services </h1>
      <Grid style={{ width: '55rem' }} data={[]}>
        <GridColumn field="Name" />
        <GridColumn
          field="Url"
          cell={(props) => (
            <td>
              <a target="_blank" rel="noopener noreferrer" href={props.field}>
                {props.field}
              </a>
            </td>
          )}
        />
      </Grid>
    </>
  )
}
