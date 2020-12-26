import '../styles/globals.css'
import Head from 'next/head'
import NavigationBar from '../components/navbar'

function MyApp({ Component, pageProps }) {
  return ( 
    <>
      <Head>
        <title>SlideYourImages</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, user-scalable=no"/>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous"></link>
      </Head>
      <NavigationBar />
      <Component {...pageProps} />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossOrigin="anonymous"></script>
    </>
  )
}

export default MyApp
