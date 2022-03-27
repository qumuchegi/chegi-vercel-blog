import { ArticleInfo } from '../types/notion'
const { Client: NotionClinet } = require("@notionhq/client")
const { NotionAPI } = require('notion-client') 

const notionAuthToken = process.env.myNotionAuthToken
const collectionId = process.env.myBlogsCollectionId
const notionAPI = new NotionClinet({
  auth: notionAuthToken
})
const notionAPI2 = new NotionAPI()
export function parsePageId(rawPageId: any) {
  if (/[^-]{8}-[^-]{4}-[^-]{4}-[^-]{4}-[^-]{12}/.test(rawPageId)) {
    return rawPageId
  }
  return [
    rawPageId.slice(0, 8),
    rawPageId.slice(8, 12),
    rawPageId.slice(12, 16),
    rawPageId.slice(16, 20),
    rawPageId.slice(20, 32)
  ].join('-')
}
export async function getSingleArticleInfo(articleId: any) {
  const res = await notionAPI.pages.retrieve({
    page_id: articleId
  })

  return _formatCMSData({
    k: res
  })
}
export async function getContentOfArticleForRender(articleId: any) {
  const res = await notionAPI2.getPage(
    articleId.replace(/-/g, '')
  )
  return res
}
export async function getAllTabArticleList() {
  const res = await notionAPI.databases.query({
    database_id: parsePageId(collectionId)
  })
  // console.log(JSON.stringify(res))
  return _formatCMSData( res.results )
}
function _formatCMSData(cmsData: Record<string, any>): {
  [tab: string]: {
    articles: ArticleInfo[]
  }
} {
  let result: Record<string, any> = {}
  Object.values(cmsData)
  .forEach(({
    id,
    url,
    created_time,
    last_edited_time,
    properties
  } ) => {
    const {
      tab,
      pageTitle,
      tag,
      progress,
      collection,
      CustomCreate
    } = properties

    const tabName = tab.select?.name
    if (!tabName || progress?.select?.name === 'doing') {
      return
    }
    const articleTitle = pageTitle.title?.[0]?.plain_text
    const collectionName = collection?.select?.name || ''
    const newItem = {
      articleUrl: url,
      articleId: id,
      createdTime: created_time,
      lastEditedTime: last_edited_time,
      title: articleTitle,
      tag,
      //CustomCreate: CustomCreate.formula.string,
      collection: collectionName
    }
    if (!result[tabName]) {
      result[tabName] = []
    }
    if (collectionName) {
      const existCollectionIdx = result[tabName].findIndex(item => item.collection === collectionName)
      if (existCollectionIdx === -1) {
        result[tabName].push({
          collection: collectionName,
          articles: [
            newItem
          ]
        })
      } else {
        result[tabName][existCollectionIdx] = {
          collection: collectionName,
          articles: [
            ...result[tabName][existCollectionIdx].articles,
            newItem
          ]
        }
      }
    } else {
      result[tabName] = [
        ...(result[tabName] || []),
        newItem
      ]
    }
  })
  return result
}
