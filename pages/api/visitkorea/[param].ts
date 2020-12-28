import axios from 'axios'

export default async (req, res) => {
    try {
        const visitkoreaList = []
        const param:string = req.query.param
        const translateUrl = `https://translation.googleapis.com/language/translate/v2?q=${param}&target=ko&key=${process.env.GOOGLE_TRANSLATION}`
        const translateResp = await axios.post(translateUrl)
        const translateData:string = await translateResp.data.data.translations[0].translatedText
        
        let visitkoreaUrl = 'http://api.visitkorea.or.kr/openapi/service/rest/PhotoGalleryService/gallerySearchList'
        visitkoreaUrl += "?ServiceKey=" + process.env.VISIT_KOREA
        visitkoreaUrl += "&pageNo=1"
        visitkoreaUrl += "&numOfRows=30"
        visitkoreaUrl += "&MobileOS=ETC"
        visitkoreaUrl += "&MobileApp=AppTest"
        visitkoreaUrl += "&arrange=D"
        visitkoreaUrl += "&keyword=" + encodeURIComponent(translateData)
        
        const visitkoreaResp = await axios.get(visitkoreaUrl)
        const visitkoreaData:any[] = await visitkoreaResp.data.response.body.items.item
        for(let i = 0; i < visitkoreaData.length; i++){
            visitkoreaList.push(await visitkoreaData[i].galWebImageUrl)
        }
        res.json({
            "response": visitkoreaList
        })
    } catch (err) {
        console.error(err)
        res.json({
            "status": "fail",
            "msg": "Server ERROR"
        })
    }
}
