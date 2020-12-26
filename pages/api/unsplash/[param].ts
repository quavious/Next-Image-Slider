// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async (req, res) => {
  try {
    const unsplashKey = process.env.Unsplash_Key
    const {query: param} = req
    const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${unsplashKey}&query=${param.param}&count=30`
    const resp = await axios.get(unsplashUrl)
    const data = await resp.data
    const results:string[] = []
    
    for(let i = 0; i < data.length; i++) {
      results.push(await data[i].urls.regular)
    }

    res.statusCode = 200
    res.json({ response : results })
  } catch(err) {
    console.error(err)
    res.statusCode = 404
    res.json({ response: "Server Error"})
  }
}
