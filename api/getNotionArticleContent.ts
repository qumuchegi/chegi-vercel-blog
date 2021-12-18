import { NextApiRequest, NextApiResponse } from 'next'
import { getContentOfArticleForRender } from './utils/notion'


export default async function getNotionArticleContent(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      articleId
    } = req.query
    const articleRecordMap = await getContentOfArticleForRender(articleId)
    res.status(200).json({
      code: 0,
      msg: 'success',
      data: {
        articleRecordMap
      }
    })
  } catch(err) {
    res.status(200).json({
      code: 1,
      err
    })
  }

}