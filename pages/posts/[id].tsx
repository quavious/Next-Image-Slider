import axios from "axios";
import { GetServerSideProps } from "next";
import {useRouter} from 'next/router'

import dbClient from '../../db/db'

export const getServerSideProps:GetServerSideProps = async(context) => {
    const {query: {id}} = context
    try {
        if(typeof id !== "string"){
            throw new Error("Parameter is invalid.")
        }

        const client = dbClient()
        const post = await client.post.findUnique({
            where: {
                id: parseInt(id, 10)
            }
        })
        const {id: pid, title, content, createdAt, authorId} = post
        const user = await client.user.findUnique({
            where: {
                id: authorId
            }
        })
        const {name} = user
        return {
            props: {
                post: {
                    status: true,
                    id: pid,
                    title,
                    content,
                    createdAt: createdAt.toISOString(),
                    username: name
                }   
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
    const {post} = props;
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
    if(!post || !post.status){
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