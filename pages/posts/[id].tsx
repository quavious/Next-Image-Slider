import axios from "axios";
import {useRouter} from 'next/router'
import { useEffect, useState } from "react";

export default function ReadPost(props){
    const username = !props.user.username ? "" : props.user.username
    const router = useRouter()
    const [post, setPost] = useState(null)
    const {id} = router.query
    useEffect(() => {
        axios.post('/api/posts/post', {
            id 
        }).then(resp => resp.data)
        .then(data => {
            const {status} = data;
            if(status !== "OK") {
                router.push("/posts")
                return
            }
            const {id:postId, title, content, createdAt, username: author} = data
            setPost({postId, title, content, createdAt, author})
        })
        .catch(err => {
            console.error(err);
            router.push("/posts");
        })
    }, [])
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
            <h4 className="font-weight-light">written by {post.author}</h4>
            <p className="font-weight-normal">{post.content}</p>
            <h4 className="font-weight-light">{post.createdAt.toString()}</h4>
            {username === post.author ?
            <div>
                <a className="btn btn-outline-danger" onClick={(e) => handleDelete(e, id)}>Delete this post</a>
                {/* <a className="btn btn-outline-warning">Edit this post</a> */}
            </div> 
            :
            <small className="text-muted text-red">You cannot modify other's posts</small>
            }
        </div>
    )
} 