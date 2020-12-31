import axios from 'axios'
import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'

export default function Register() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
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
        if(password !== password2){
            console.error("Password does not match")
            router.reload()
            return
        }

        const resp = await axios.post("/api/users/register", {
            email: email,
            username: username,
            password: password,
            password2: password2
        })
        const status: string = await resp.data.status
        
        if(status!=="OK") {
            alert("Registration Denied")
            router.reload()
            return
        }
        console.log(resp.data.msg)
        router.push("/")
    }
    const handleChange = (e) => {
        e.preventDefault()
        switch(e.target.name) {
            case "email":
                setEmail(e.target.value)
                break;
            case "username":
                setUsername(e.target.value)
                break;
            case "password":
                setPassword(e.target.value)
                break;
            case "password2":
                setPassword2(e.target.value)
                break;
            default:
                break
        }
    }

    return (
        <>
            <div>
                <div className="container" style={{marginTop: 120}}>
                    <h1>Register Page</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-1">
                            <label htmlFor="email">Email Address</label>
                            <input className="form-control" type="email" id="email" name="email" value={email} placeholder="Email" onChange={handleChange} required/>
                            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group my-1">
                            <label htmlFor="username">Your Username</label>
                            <input className="form-control" type="text" id="username" name="username" value={username} placeholder="Username" onChange={handleChange} required/>
                            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group my-1">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" id="password" name="password" value={password} placeholder="Password" onChange={handleChange} required/>
                            <small className="form-text text-muted">Your password is being encrypted.</small>
                        </div>
                        <div className="form-group my-1">
                            <label htmlFor="password2">Repeat Password</label>
                            <input className="form-control" type="password" id="password2" name="password2" value={password2} placeholder="Confirm Password" onChange={handleChange} required/>
                        </div>
                        <button type="submit" className="btn btn-outline-primary mr-4">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}