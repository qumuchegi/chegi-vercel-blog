import { useNaviToArticleDetail } from '@/routes/category/article'
import { useStore } from '@/store'
import { ArticleInfo } from '@/store/type'
import { combineClassNames } from '@/utils/style'
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import styles from './styles.module.less'

export default function ArticleList() {
  const params: {tabId: string} = useParams()
  // console.log({ params });
  const isNarrowDevice = useStore(state => state.uiState.isNarrowDevice)
  const getArticlesByTabName = useStore(state => state.articles.actions.getArticlesByTabName)
  const changeSelectedTab = useStore(state => state.uiState.actions.changeSelectedTab)
  const selectedTab = useStore(state => state.uiState.selectedTab)
  const selectedArticleId = useStore(state => state.uiState.selectedArticleId)
  const changeSelectedArticle = useStore(state => state.uiState.actions.changeSelectedArticle)
  const hadAutoSelec = useRef(false)
  const [isOpenListDetail, setIsOpenListDetail] = useState<boolean>(false)
  useEffect(() => {
    if (hadAutoSelec.current) {
      return
    }
    changeSelectedTab(params.tabId)
    hadAutoSelec.current = true
  }, [params])
  const openListDetail = useCallback(() => {
    if (!isNarrowDevice) {
      return
    }
    setIsOpenListDetail(true)
  },  [isNarrowDevice])
  useEffect(() => {
    openListDetail()
  }, [openListDetail, params.tabId])
  const toArticleDetail = useNaviToArticleDetail() // { articleId: '12' }

  const onSelectArticle = useCallback(
    (articleId: string) => {
      toArticleDetail({
        tabId: selectedTab,
        articleId: articleId
      })
      changeSelectedArticle(articleId)
    },
    [changeSelectedArticle, selectedTab]
  )
  const articleList = useMemo(() => {
    if (selectedTab) {
      const articles = getArticlesByTabName(selectedTab)
      if (articles?.length) {
        return articles
        ?.map((article: ArticleInfo) => {
          return <div
            key={article.articleId}
            className={
              combineClassNames(
                styles.listItem,
                selectedArticleId === article.articleId ? styles.listItemSelected : '',
              )
            }
            onClick={() => onSelectArticle(article.articleId)}
          >
            <div>{article.title}</div>
          </div>
        })
      }
      return <div className={styles.warnText}>
        no article in this tab!
      </div>
    } else {
      return <div>some error!</div>
    }
  }, [getArticlesByTabName, selectedTab])

  return <div className={styles.articleList}>
    {
      isNarrowDevice ?
        <details open={isOpenListDetail}>
          <summary className={styles.listSummary}>article list</summary>
          <p>{articleList}</p>
        </details>
        : articleList
    }
  </div>
}