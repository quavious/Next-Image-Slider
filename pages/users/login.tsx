import axios from 'axios'
import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    useEffect(() => {
        axios.post("/api/users/auth", {})
        .then(resp => resp.data)
        .then(async (data) => {
            const flag = await data.status
            if(flag === "OK") {
                router.push("/")
            }
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await axios.post("/api/users/login", {
                email: email,
                password: password,
            })
            const status: string = await resp.data.status
            
            if(status!=="OK") {
                alert("Access Denied")
                router.reload()
                return
            }
            router.reload()
        } catch(err) {
            console.error(err)
        }
    }
    const handleChange = (e) => {
        e.preventDefault()
        switch(e.target.name) {
            case "email":
                setEmail(e.target.value)
                break;
            case "password":
                setPassword(e.target.value)
                break;
            default:
                break
        }
    }

    return (
        <>
            <div>
                <div className="container" style={{marginTop: 120}}>
                    <h1>Login Page</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input className="form-control" type="email" id="email" name="email" value={email} placeholder="Email" onChange={handleChange}/>
                            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" id="password" name="password" value={password} placeholder="Password" onChange={handleChange}/>
                            <small className="form-text text-muted">Your password is being encrypted.</small>
                        </div>
                        <button type="submit" className="btn btn-primary mr-4">Login</button>
                        <a href="/users/register" className="btn btn-outline-success">Register</a>
                    </form>
                </div>
            </div>
        </>
    )
}