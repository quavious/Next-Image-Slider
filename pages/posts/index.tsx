import axios from 'axios'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import dbClient from '../../db/db'

export const getServerSideProps:GetServerSideProps = async(context) => {
    const posts = []
    const client = dbClient()
    const resp = await client.post.findMany()
    for(let i = resp.length - 1; i >= 0; i--) {
        const {id: pid, title, content, createdAt, authorId} = resp[i]
        const {name} = await client.user.findUnique({
            where: {
                id: authorId
            }
        })
        posts.push({
            id: pid, name, title, content, createdAt: createdAt.toISOString()
        })
    }
    return {
        props: {
            posts : posts,
        }
    }
}

export default function Posts(props){
    const {posts, user} = props;
    const logged = !user ? false: user.username 

    return (
        <div className="container">
            <h1>Posts Page</h1>
            {posts.map(post => {
                return (
                <div key={post.id}>
                    <Link href={`/posts/${post.id}`}>
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