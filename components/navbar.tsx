import Link from 'next/link';
import {useRouter} from 'next/router'
import { useState } from 'react';
import axios from 'axios';

import styles from '../styles/Navbar.module.css';
import { UserInfo } from '../interfaces/user/auth';

export default function NavigationBar(props:UserInfo) {
    const [show, setShow] = useState(false)
    const router = useRouter()
    const {username, email} = !props ? null : props;

    const handleClick = (e) => {
        e.preventDefault()
        if(!show) {
            setShow(true)
        } else {
            setShow(false)
        }
    }
    const handleLogout = async (e) => {
        e.preventDefault()
        const resp = await axios.post('/api/users/logout', {})
        const {status, msg} = await resp.data
        if(status !== "OK") {
            alert(msg)
            return
        }
        alert(msg)
        router.reload()
        return
    }


    return (
        <nav className={`navbar navbar-expand-lg navbar-dark bg-dark px-4 fixed-top ${styles['navbar-shadow']}`}>
            <Link href="/">
            <a className="mx-2 navbar-brand d-flex align-items-center" >
                <img src="https://www.flaticon.com/svg/static/icons/svg/842/842926.svg" className="mx-2" width={36}/>
                SlideYourImages
            </a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={handleClick} data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${!show ? "" : "show"}`} id="navbarColor02">
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
                    <li className="nav-item">
                        <Link href="/slider/visitkorea">
                            <a className="nav-link btn btn-outline-danger text-start" style={{border: 'none'}} href="/slider/visitkorea">Korean</a>
                        </Link>
                    </li>
                    <li className="nav-item ml-2">
                        <Link href="/posts">
                            <a className="nav-link" href="#">Posts</a>
                        </Link>
                    </li>
                    {!username
                    ?
                    <li className="nav-item">
                        <Link href="/users/login">
                            <a className="nav-link btn btn-primary" style={{border: 'none'}} href="/users/login">Login</a>
                        </Link>
                    </li> 
                    : 
                    <>
                        <li className="nav-item">
                            <a className="nav-link">{username}</a>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-primary" style={{border: 'none'}} onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                    }
                </ul>
            </div>
        </nav>
    )
}
