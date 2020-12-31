import axios from 'axios'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

export default function Posts(){
    const [logged, setLogged] = useState(false)
    const [posts, setPosts] = useState<any[]>([])
    useEffect(() => {
        axios.post("/api/users/auth", {})
        .then(resp => resp.data)
        .then(async (data) => {
            const flag = await data.status
            if(flag === "OK") {
                setLogged(true)
            }
        })
        .catch(err => {
            console.error(err)
        })
    }, [])
    useEffect(() => {
        axios.get("/api/posts/all")
        .then(resp => resp.data)
        .then(async (data) => {
            if(data.status === "fail") return;
            setPosts(await data.posts)
        })
        .catch(err => console.error(err))
    }, [logged])

    return (
        <div className="container">
            <h1>Posts Page</h1>
            {posts.map(post => {
                return (
                <div key={post.postId}>
                    <Link href={`/posts/${post.postId}`}>
                    <h3>{post.title}</h3>
                    </Link>
                    <h5>{post.content.slice(0, 30)}</h5>
                    <h5>{post.name} {post.createdAt}</h5>
                </div>
                )
            })}
            {logged ? 
            <Link href="/posts/write">
                <button className="btn btn-primary">Write a Post</button>
            </Link> : 
            <p className="text-small text-danger">You must login this web site to write your post.</p>
            }
            
        </div>
    )
}