import { useNaviToArticleDetail } from '@/routes/category/article'
import { useStore } from '@/store'
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
  const onSelectArticle = useCallback(
    (articleId: string) => {
      changeSelectedArticle(articleId)
      toArticleDetail({
        tabId: selectedTab,
        articleId: articleId
      })
    },
    [selectedTab, toArticleDetail]
  )

  return <div>
    { articles
      ?.map((article: ArticleInfo) => {
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
          <div>{article.title}</div>
        </div>
      })
    }
  </div>
}
  