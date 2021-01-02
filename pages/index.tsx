import Head from 'next/head'
import NavigationBar from '../components/navbar'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home({user}) {
  return (
    <>
      <div className={styles.container}>
        <h1>Hello World!</h1>
        <h2>{!user ? "" : user.username}</h2>
        <div className="mt-4 d-flex flex-column align-items-center">
          <Link href="/slider">
            <a className="btn btn-outline-success btn-lg mx-3 my-4">Go to the Upload page.</a>
          </Link>
          <Link href="/slider/unsplash">
            <a className="btn btn-outline-primary btn-lg mx-3 my-4">Go to the Search page.</a>
          </Link>
          <Link href="/slider/unsplash">
            <a className="btn btn-outline-danger btn-lg mx-3 my-4">Go to the Korean page.</a>
          </Link>
          <Link href="/posts">
            <a className="btn btn-outline-danger btn-lg mx-3 my-4">Go to the Post page.</a>
          </Link>
        </div>
      </div>
    </>
  )
}
