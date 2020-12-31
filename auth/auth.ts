import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { ReturnAuth, Payload } from "../interfaces/user/auth";

export default (token: string): ReturnAuth => {
    try {
        const decoded = jwt.verify(token, 'NextAndPrismaAndMariaDB') as Payload
        const userId:number = decoded.user.id
        return {
            verified: true,
            userId: userId
        } as ReturnAuth
    } catch (err) {
        console.error(err)
        return {
            verified: false,
            userId: -10000
        } as ReturnAuth
    }
}