import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import dbClient from '../../../db/db'
import {LoginForm} from '../../../interfaces/user/userform'
import { Payload, ReturnToken } from "../../../interfaces/user/auth";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {email, password}: LoginForm = req.body
    const client = dbClient()
    const userExpected = await client.user.findUnique({
        where: {
            email: email
        }
    })
    try {
        const compare = bcrypt.compareSync(password, userExpected.password)
        if(!compare) {
            res.json({
                "status": "fail",
                "msg": "Server ERROR"
            })
            return    
        }
        const payload: Payload = {
            user: {
                id: userExpected.id
            }
        };
        const tokenData = await (function():Promise<ReturnToken>{
            return new Promise((res, rej) => {
                jwt.sign(
                    payload,
                    "NextAndPrismaAndMariaDB",
                    {
                        expiresIn: 36000
                    },
                    (err, token) => {
                        if(err) rej({
                            isError: true,
                            message: err.message
                        });
                        res({
                            isError: false,
                            message: token
                        })
                    }
                )
            })
        })();
        if(tokenData.isError) {
            throw new Error(tokenData.message)
        }
        res.setHeader("Set-Cookie", `x-token=${tokenData.message}; path=/; samesite=lax; httponly`)
        res.json({
            "status": "OK",
            "msg" : "Login Successful"
        })
        return
        
    } catch(err){
        console.error(err)
        res.json({
            "status": "fail",
            "msg": "Server ERROR"
        })
    }
}