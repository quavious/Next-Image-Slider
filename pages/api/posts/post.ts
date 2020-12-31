import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import dbClient from '../../../db/db'
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = dbClient()
        const {id} = req.body
        const post = await client.post.findUnique({
            where: {
                id: parseInt(id, 10)
            }
        })
        const {id: postId, title, content, createdAt, authorId} = post
        const user = await client.user.findUnique({
            where: {
                id: authorId
            }
        })
        const {name} = user
        res.json({
            status: "OK",
            id: postId,
            title,
            content,
            createdAt,
            username: name
        })
    }catch(err){
        console.error(err)
        res.json({
            "status": "fail",
            "msg": "Server ERROR"
        })
    }
}