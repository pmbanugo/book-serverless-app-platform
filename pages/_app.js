import '../styles/globals.css'
import '@progress/kendo-theme-bootstrap/dist/all.css'
import Navbar from '../components/navbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main className="main">
        <Component {...pageProps} />
      </main>

      <footer></footer>
    </>
  )
}

export default MyApp
