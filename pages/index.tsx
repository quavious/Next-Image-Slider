import Head from 'next/head'
import NavigationBar from '../components/navbar'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <h1>Hello World!</h1>
        <div className="mt-4 d-flex justify-content-around">
          <Link href="/slider">
            <a className="btn btn-outline-success btn-lg mx-3">Go to the upload page.</a>
          </Link>
          <Link href="/slider/unsplash">
            <a className="btn btn-outline-primary btn-lg mx-3">Go to the search page.</a>
          </Link>
        </div>
      </div>
    </>
  )
}
