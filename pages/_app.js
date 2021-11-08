import '../styles/globals.css'
import '@progress/kendo-theme-bootstrap/dist/all.css'
import NavBar from '../components/NavBar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <main className="main">
        <Component {...pageProps} />
      </main>

      <footer></footer>
    </>
  )
}

export default MyApp
