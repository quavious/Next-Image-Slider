import { NextApiRequest, NextApiResponse } from "next";
import dbClient from '../../../db/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "POST") {
        res.json({
            "status": false,
            "msg": "Server ERROR"
        })
    }
    try {
        const client = dbClient()
        const {title, content, author}:{title: string, content:string, author: string} = req.body;
        await client.post.create({
            data: {
                title: title,
                content: content,
                user: {
                    connect: {
                        name: author
                    }
                }
            }
        })
        res.json({
            "status": true,
            "msg": "Upload Successful"
        })
    } catch(err) {
        console.error(err)
        res.json({
            "status": false,
            "msg": "Server ERROR"
        })
    }
}