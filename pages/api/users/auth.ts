import { NextApiRequest, NextApiResponse } from 'next'
import Authenticate from '../../../auth/auth'
import { ReturnAuth } from '../../../interfaces/user/auth'
import dbClient from '../../../db/db'
import Cookies from 'cookie'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const cookie = Cookies.parse(req.headers.cookie ?? "")
    const xToken = cookie["x-token"]
    const {verified, userId} : ReturnAuth = Authenticate(xToken)
    if(!verified) {
        res.setHeader("Set-Cookie", `x-token=${""}; path=/; samesite=lax; httponly`)
        res.status(400).json({
            "status" : "fail",
            "msg": "Server ERROR"
        })
        return
    }
    const client = dbClient()
    const {email, name} = await client.user.findUnique({
        where: {
            id: userId
        }
    })
    res.status(200).json({
        "status": "OK",
        "email": email,
        "username": name
    })
    return
    
}