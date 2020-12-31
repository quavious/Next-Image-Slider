import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "POST") {
        res.json({
            "status": "fail",
            "msg": "Invalid Access OR Server ERROR"
        })
        return
    }
    res.setHeader("Set-Cookie", `x-token=${""}; path=/; samesite=lax; httponly`)
    res.json({
        "status": "OK",
        "msg": "Bye"
    })
}