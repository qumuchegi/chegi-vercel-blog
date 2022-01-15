import SearchSelect from '@/Components/SearchSelect'
import { useNaviToArticleDetail } from '@/routes/category/article'
import { useStore } from '@/store'
import { ArticleInfo } from '@/store/type'
import { combineClassNames } from '@/utils/style'
import React, { useRef, useState, useEffect, useMemo, useCallback, createRef } from 'react'
import { useParams } from 'react-router-dom'
import styles from './styles.module.less'
import ArticlList from './list'

export default function ArticleList() {
  const params: {tabId: string} = useParams()
  // console.log({ params });
  const isNarrowDevice = useStore(state => state.uiState.isNarrowDevice)
  const getArticlesByTabName = useStore(state => state.articles.actions.getArticlesByTabName)
  const changeSelectedTab = useStore(state => state.uiState.actions.changeSelectedTab)
  const selectedTab = useStore(state => state.uiState.selectedTab)
  const hadAutoSelec = useRef(false)
  useEffect(() => {
    if (hadAutoSelec.current) {
      return
    }
    changeSelectedTab(params.tabId)
    hadAutoSelec.current = true
  }, [params])
  const toArticleDetail = useNaviToArticleDetail() // { articleId: '12' }

  const list = <ArticlList toArticleDetail={toArticleDetail}/>
  const articleList = useMemo(() => {
    if (selectedTab) {
      const articles = getArticlesByTabName(selectedTab)
      if (articles?.length) {
        return list
      }
      return <div className={styles.warnText}>
        no article in this tab!
      </div>
    } else {
      return <div>some error!</div>
    }
  }, [getArticlesByTabName, selectedTab])

  return <div className={styles.articleList}>
    {/* <SearchSelect options={[
      {
        key: '1',
        value: '1'
      },
      {
        key: '2',
        value: '2'
      },
      {
        key: '3',
        value: '3'
      }
    ]}/> */}
    {
      !isNarrowDevice && articleList
    }
  </div>
}