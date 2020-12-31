import cookie from 'cookie'
import { NextApiRequest } from 'next'

export default function parseCookies(req) {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}