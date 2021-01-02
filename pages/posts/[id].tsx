import axios from "axios";
import { GetServerSideProps } from "next";
import {useRouter} from 'next/router'

export const getServerSideProps:GetServerSideProps = async(context) => {
    const {query: {id}} = context
    try {
        const resp = await axios.post(`https://next-image-slider.vercel.app/api/posts/post`, {
            id
        })
        const {status} = await resp.data
        if(status !== "OK"){
            throw new Error("Server ERROR")
        }
        const post = await resp.data
        return {
            props : {
                post: await post
            }
        }
    } catch (err) {
        console.error(err)
        context.res.writeHead(301, {
            "location": "/posts"
        })
    }
}

export default function ReadPost(props){
    const username = !props.user ? "" : props.user.username
    const post = props.post 
    const router = useRouter()

    const handleDelete = async (e, id) => {
        e.preventDefault()
        const resp = await axios.post("/api/posts/delete", {
            id
        })
        const data = await resp.data 
        if(!data.status) {
            alert("Server ERROR")
            router.reload()
        }
        router.push("/posts")
    }
    if(!post){
        return (
            <div className="container">
                <h1 className="text-center">Loading Post...</h1>
            </div>
        )
    }
    return (
        <div className="container">
            <h1>{post.title}</h1>
            <h4 className="font-weight-light">written by {post.username}</h4>
            <p className="font-weight-normal">{post.content}</p>
            <h4 className="font-weight-light">{post.createdAt.toString()}</h4>
            {username === post.username ?
            <div>
                <a className="btn btn-outline-danger" onClick={(e) => handleDelete(e, post.id)}>Delete this post</a>
                {/* <a className="btn btn-outline-warning">Edit this post</a> */}
            </div> 
            :
            <small className="text-muted text-red">You cannot modify other's posts</small>
            }
        </div>
    )
} 