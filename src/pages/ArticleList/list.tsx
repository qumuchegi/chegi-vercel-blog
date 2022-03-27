import { useNaviToArticleDetail } from '@/routes/category/article'
import { useStore } from '@/store'
import { useBottomSheet } from '@/store/hooks'
import { ArticleInfo } from '@/store/type'
import { combineClassNames } from '@/utils/style'
import React, { useCallback, useState } from 'react'
import styles from './liststyle.module.less'

export default function ArticlList(
  {
    toArticleDetail
  }: {
  toArticleDetail: ReturnType<typeof useNaviToArticleDetail>
}) {
  const selectedTab = useStore(state => state.uiState.selectedTab)
  const getArticlesByTabName = useStore(state => state.articles.actions.getArticlesByTabName)
  const articles = getArticlesByTabName(selectedTab)
  const selectedArticleId = useStore(state => state.uiState.selectedArticleId)
  const changeSelectedArticle = useStore(state => state.uiState.actions.changeSelectedArticle)
  const {
    open: openBottomSeet,
    close: closeBottomSheet
   } = useBottomSheet()
  const onSelectArticle = useCallback(
    (articleId: string) => {
      changeSelectedArticle(articleId)
      toArticleDetail({
        tabId: selectedTab,
        articleId: articleId
      })
      setTimeout(() => {
        closeBottomSheet()
      }, 200)
    },
    [selectedTab, toArticleDetail, closeBottomSheet]
  )

  const generateArtcileMenuItem = useCallback((article: ArticleInfo) => {
    return <div
      key={article.articleId}
      className={
        combineClassNames(
          styles.listItem,
          selectedArticleId === article.articleId ? styles.listItemSelected : '',
        )
      }
      onClick={() => {
        onSelectArticle(article.articleId)
      }}
    >
      <div className={styles.title}>{article.title}</div>
    </div>
  }, [selectedArticleId])
  // console.log({
  //   articles
  // });
  return <div style={{padding: '10px'}} className={styles.container}>
    { articles
      ?.map((
          article:
            ArticleInfo
            | (
              {
                type: 'collection',
                collection: string,
                articles: ArticleInfo[]
              }
            )
      ) => {
        //@ts-ignore
        if (article.collection) {
          return <details>
            <summary>{article.collection}</summary>
            {
              // @ts-ignore
              article.articles.map(item => {
                return generateArtcileMenuItem(item)
              })
            }
          </details>
        }
        // @ts-ignore
        return generateArtcileMenuItem(article)
      })
    }
  </div>
}
  