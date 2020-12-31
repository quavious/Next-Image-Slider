import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'

import dbClient from '../../../db/db'
import {RegisterForm} from '../../../interfaces/user/userform'
const client = dbClient()

export default async (req:NextApiRequest, res:NextApiResponse) => {
    console.log(req.method)

    const {email, username, password, password2}:RegisterForm = req.body
    if(password !== password2) {
        res.json({
            "status": "fail",
            "msg": "Server ERROR"
        })
        return
    }
    try {
        const hash = bcrypt.hashSync(password, 10)
        await client.user.create({
            data: {
                email: email,
                name: username,
                password: hash
            }
        })
        res.json({
            "status": "OK",
            "msg": `The Account ${username} with ${email} is now available!`
        })
    } catch(err) {
        console.error(err)
        res.json({
            "status": "fail",
            "msg": "Server ERROR"
        })
    }
    
}