import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { useNaviToArticleList } from '@/routes/category/article'
import styles from './style.module.less'
import { useStore } from '@/store'
import { combineClassNames } from '@/utils/style'

export default function Home() {
  const toArticleList = useNaviToArticleList()
  const tabArticles = useStore(state => state.articles.tabArticles)
  const changeSelectedTab = useStore(state => state.uiState.actions.changeSelectedTab)
  const selectedTab = useStore(state => state.uiState.selectedTab)
  const tabNames = useMemo(() => tabArticles ? Object.keys(tabArticles) : [], [tabArticles])
  const onPressTab = useCallback((tabName) => {
    toArticleList({ tabId: tabName })
    changeSelectedTab(tabName)
  }, [toArticleList])

  const tabs = useMemo(() => {
    if (tabNames) {
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
      return null
    }
  }, [tabNames, selectedTab, onPressTab])

  useEffect(() => {
    if (!selectedTab) {
      changeSelectedTab(tabNames[0])
    }
  }, [tabNames, changeSelectedTab])
  
  return <div className={styles.tabContainer}>
    {tabs}
  </div>
}