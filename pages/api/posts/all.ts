import { NextApiRequest, NextApiResponse } from "next";
import dbClient from '../../../db/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "GET") {
        res.json({
            "status": "fail"
        })
        return;
    }
    const postArray = []
    try {
        const client = dbClient()
        const posts = await client.post.findMany()
        for(let i = posts.length - 1; i >= 0; i--) {
            const {id, title, content, createdAt, authorId} = posts[i]
            const {name} = await client.user.findUnique({
                where: {
                    id: authorId
                }
            })
            postArray.push({
                postId: id, name, title, content, createdAt
            })
        }
        res.json({
            posts: postArray
        })
    } catch (err) {
        console.error(err)
        res.json({
            status: "fail"
        });
    }
}