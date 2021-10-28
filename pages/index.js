import Head from 'next/head'
import { Grid, GridColumn } from '@progress/kendo-react-grid'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        style={{ width: '50%' }}
        data={[
          { Name: 'One', Url: 'url.com' },
          { Name: 'Two', Url: 'url.com' },
        ]}
      >
        <GridColumn field="Name" />
        <GridColumn field="Url" />
      </Grid>
    </>
  )
}
