import { NextApiRequest, NextApiResponse } from "next";
import dbClient from '../../../db/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {id} = req.body;
        const client = dbClient()
        const post = await client.post.delete({
            where: {
                id: parseInt(id, 10)
            }
        })
        res.json({
            "status": !post ? false: true
        })
    }
    catch(err) {
        console.error(err)
        res.json({
            "status": false
        })
    }
}