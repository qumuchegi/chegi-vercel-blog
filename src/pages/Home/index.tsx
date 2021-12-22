import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { useNaviToArticleList } from '@/routes/category/article'
import styles from './style.module.less'
import { useStore } from '@/store'
import { combineClassNames } from '@/utils/style'
import { repeatArr } from '@/utils/array'
import Skeleton from '@/Components/Skeleton'

export default function Home() {
  const toArticleList = useNaviToArticleList()
  const tabArticles = useStore(state => state.articles.tabArticles)
  const changeSelectedTab = useStore(state => state.uiState.actions.changeSelectedTab)
  const changeSelectedArticle = useStore(state => state.uiState.actions.changeSelectedArticle)
  const selectedTab = useStore(state => state.uiState.selectedTab)
  const tabNames = useMemo(() => tabArticles ? Object.keys(tabArticles) : [], [tabArticles])
  const onPressTab = useCallback((tabName) => {
    toArticleList({ tabId: tabName })
    changeSelectedTab(tabName)
    changeSelectedArticle(null)
  }, [toArticleList, changeSelectedTab, changeSelectedArticle])

  const tabs = useMemo(() => {
    if (tabNames.length) {
      return tabNames.map(
        tabName => <div
          key={tabName}
          className={
            combineClassNames(
              styles.tabItem,
              tabName === selectedTab ? styles.selectedtabItem : ''
            )
          }
          onClick={() => onPressTab(tabName)}
        >
          {tabName}
        </div>
      )
    } else {
      return repeatArr(
        <Skeleton showSkeleton className={styles.tabSkeleton}/>,
        4,
        (_, index) => <div key={index}>{_}</div>
      )
    }
  }, [tabNames, selectedTab, onPressTab])

  // useEffect(() => {
  //   if (!selectedTab) {
  //     changeSelectedTab(tabNames[0])
  //   }
  // }, [tabNames, changeSelectedTab])
  
  return <div className={styles.tabContainer}>
    {
      tabs
    }
  </div>
}