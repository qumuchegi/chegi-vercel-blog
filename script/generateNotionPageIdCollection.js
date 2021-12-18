const fs = require('fs')
const https = require('https')
const axios = require('axios')
const { NotionAPI } = require('notion-client') 
const { Client: NotionClinet } = require("@notionhq/client")
const conf = require('./config.json')

const {
  notionAuthToken,
  cmsPageId
} = conf
const notionApi = new NotionClinet({
  auth: notionAuthToken
})
const notionApi2 = new NotionAPI()
function parsePageId(rawPageId) {
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
async function getNotionCMS() {
  const res = await notionApi.databases.query({
    database_id: parsePageId(cmsPageId)
  })
  return res.results
}


 function formatCMSData(cmsData) {
   let result = {}
   console.log({
    cmsData
   })
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
      tag
    } = properties
    const tabName = tab.select?.name
    if (!tabName) {
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

// (async () => {
//   console.log(
//     JSON.stringify(
//       formatCMSData(await getNotionCMS())
//     )
//   )  
//  })()

// async function getSingleArticleInfo(articleId) {
//   const res = await notionApi.pages.properties({
//     page_id: articleId
//   })

//   return res
// }

async function getContentOfArticleForRender(articleId) {
  const res = await notionApi2.getPage(
    articleId.replace(/-/g, '')
  )
  return res
}
(async () => {
  console.log(
    '999',
    JSON.stringify(
      await getContentOfArticleForRender('ee4c30e7-b069-4b99-95b5-5df818afa815')
    )
  )  
 })()