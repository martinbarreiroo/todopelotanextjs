import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="app-background">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp