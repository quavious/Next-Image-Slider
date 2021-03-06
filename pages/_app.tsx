import '../styles/globals.css'
import Head from 'next/head'
import NavigationBar from '../components/navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Router from "next/router";

import {UserInfo} from '../interfaces/user/auth'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState<UserInfo>(null)
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios.post('/api/users/auth')
    .then(resp => resp.data)
    .then(async (data) => {
        if(await data.status !== "OK") {
            return;
        }
        const {username, email} = await data
        setUser({
          username: await username,
          email: await email,
        })
    })
    .catch(err => {
        console.error(err)
    });
  }, [])
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return ( 
    <>
      <Head>
        <title>SlideYourImages</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, user-scalable=no"/>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous"></link>
      </Head>
      <NavigationBar {...user} />
      <Component {...pageProps} user={user} />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossOrigin="anonymous"></script>
    </>
  )
}

export default MyApp
