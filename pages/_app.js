import '../styles/globals.css'
import '@progress/kendo-theme-bootstrap/dist/all.css'
import AppBar from '../components/AppBar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppBar />
      <main className="main">
        <Component {...pageProps} />
      </main>

      <footer></footer>
    </>
  )
}

export default MyApp
