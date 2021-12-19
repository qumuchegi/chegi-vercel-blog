import { ArticleInfo } from '../types/notion'
const { Client: NotionClinet } = require("@notionhq/client")
const { NotionAPI } = require('notion-client') 
const conf = require('../configure/notion.json')

const {
  notionAuthToken,
  collectionId
} = conf

const notionAPI = new NotionClinet({
  auth: notionAuthToken
})
const notionAPI2 = new NotionAPI()
export function parsePageId(rawPageId) {
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
export async function getSingleArticleInfo(articleId) {
  const res = await notionAPI.pages.retrieve({
    page_id: articleId
  })

  return _formatCMSData({
    k: res
  })
}
export async function getContentOfArticleForRender(articleId) {
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
function _formatCMSData(cmsData: unknown): {
  [tab: string]: {
    articles: ArticleInfo[]
  }
} {
  let result = {}
  Object.values(cmsData).forEach(({
    id,
    url,
    created_time,
    last_edited_time,
    properties
  }) => {
    const {
      tab,
      pageTitle,
      pageShortDescription,
      thumbnail,
      tag,
      progress
    } = properties
    const tabName = tab.select?.name
    if (!tabName || progress?.select?.name === 'doing') {
      return
    }
    const articleTitle = pageTitle.title?.[0]?.plain_text
    const description = pageShortDescription.rich_text[0]?.plain_text
    const thumbnailUrl = thumbnail.files[0]?.file.url
    result[tabName] = [
      ...(result[tabName] || []),
      {
        articleUrl: url,
        articleId: id,
        createdTime: created_time,
        lastEditedTime: last_edited_time,
        title: articleTitle,
        description,
        thumbnail: thumbnailUrl,
        tag
      }
    ]
  })
  return result
}
