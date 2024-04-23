import { Toaster } from 'sonner';
import '../styles/global.css'
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  return (
    <div className="app-background">
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <title>TodoPelota</title>
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </div>
  )
}

export default MyApp