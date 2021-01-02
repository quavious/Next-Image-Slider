import axios from "axios"
import { useEffect, useState } from "react"
import {useRouter} from 'next/router'
export default function WritePost(){
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [user, setUser] = useState("")
    
    useEffect(() => {
        axios.post("/api/users/auth", {})
        .then(resp => resp.data)
        .then(async (data) => {
            const {status, username} = await data
            if(status !== "OK") {
                alert("You are not authenticated")
                router.push("/posts")
            }
            setUser(await username)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])
    const handleChange = (e) => {
        e.preventDefault()
        switch(e.target.name){
            case "title":
                setTitle(e.target.value);
                break
            case "content":
                setContent(e.target.value);
                break;
            default:
                break;    
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await axios.post("/api/posts/upload", {
                title: title,
                content: content,
                author: user
            })
            const {status, msg}:{status: boolean, msg: string} = await resp.data
            if(!status) {
                throw new Error(msg)
            }
            console.log(msg)
            router.push("/posts")
        } catch(err) {
            console.error(err)
            alert("Server ERROR")
            router.reload()
        }
    }
    return (
        <div className="container">
            <h1>Write Post</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input className="form-control" type="text" id="title" name="title" value={title} placeholder="Post Title" onChange={handleChange}/>
            </div>
            <div className="form-group my-2">
                <label htmlFor="content">Content</label>
                <textarea className="form-control" id="content" name="content" value={content} placeholder="Password" onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary mr-4">Submit</button>
        </form>
        </div>
    )
}