import Link from 'next/link';
import styles from '../../styles/Navbar.module.css'

export default function NavigationBar() {
    return (
        <nav className={`navbar navbar-expand-lg navbar-dark bg-dark px-4 fixed-top ${styles['navbar-shadow']}`}>
            <Link href="/">
            <a className="mx-2 navbar-brand d-flex align-items-center" >
                <img src="https://www.flaticon.com/svg/static/icons/svg/842/842926.svg" className="mx-2" width={36}/>
                SlideYourImages
            </a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link href="/">
                            <a className="nav-link">
                                Main Page
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/slider">
                            <a className="nav-link">Upload</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/slider/unsplash">
                            <a className="nav-link" href="/slider/unsplash">Search</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
