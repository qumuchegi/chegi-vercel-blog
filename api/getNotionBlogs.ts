import { NextApiRequest, NextApiResponse } from 'next'
import { getAllTabArticleList, getSingleArticleInfo } from './utils/notion'
import notionConf from './configure/notion.json'
import { CollectionViewBlock } from 'notion-types'
const { Client: NotionClinet } = require("@notionhq/client")

const {
  notionAuthToken,
  collectionId
} = notionConf

export default async function getNotionBlogs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      articleId,
      limit,
      offset
    } = req.query
    if (articleId) {
      const singleAricle = await getSingleArticleInfo(articleId as string)
      res.status(200).json({
        code: 0,
        msg: 'success',
        data: {
          tabBlogs: [singleAricle]
        }
      })
    }
    const tabBlogs = await getAllTabArticleList()
    res.status(200).json({
      code: 0,
      msg: 'success',
      data: {
        tabBlogs
      }
    })  
  } catch (err) {
    res.json({
      code: 1,
      err
    })
  }
}