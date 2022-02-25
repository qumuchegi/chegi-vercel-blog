import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { useNaviToArticleDetail, useNaviToArticleList } from '@/routes/category/article'
import styles from './style.module.less'
import { useStore } from '@/store'
import { combineClassNames } from '@/utils/style'
import { repeatArr } from '@/utils/array'
import Skeleton from '@/Components/Skeleton'
import ArticlList from '../ArticleList/list'
import { useBottomSheet } from '@/store/hooks'
import icMore from '@/assets/img/more.png'

export default function Home() {
  const [isMoreIconVisible, setIsMoreIconVisible] = useState(false)
  const headerRef = useRef<any>()
  const [showArticleTitle, setShowArticleTitle] = useState(false)
  const toArticleList = useNaviToArticleList()
  const tabArticles = useStore(state => state.articles.tabArticles)
  const changeSelectedTab = useStore(state => state.uiState.actions.changeSelectedTab)
  const changeSelectedArticle = useStore(state => state.uiState.actions.changeSelectedArticle)
  const selectedTab = useStore(state => state.uiState.selectedTab)
  const {
    open: openBottomSeet,
    close: closeBottomSheet
   } = useBottomSheet()
  const tabNames = useMemo(() => tabArticles ? Object.keys(tabArticles) : [], [tabArticles])
  const toArticleDetail = useNaviToArticleDetail() // { articleId: '12' }
  const selectedArticleId = useStore(state => state.uiState.selectedArticleId)
  const getArticleInfo = useStore(state => state.articles.actions.getArticleInfo)
  const articleTitle = useMemo(() => {
    return getArticleInfo(selectedArticleId)?.title
  }, [getArticleInfo,selectedArticleId ])
  const articleList = <div>
    <ArticlList  toArticleDetail={toArticleDetail}/>
  </div>
  const onPressTab = useCallback((tabName) => {
    if (tabName === selectedTab) {

    } else {
      changeSelectedTab(tabName)
      toArticleList({ tabId: tabName })
      changeSelectedArticle(null)
    }
    openBottomSeet(articleList, <h2>{tabName}</h2>)
  }, [toArticleList, changeSelectedTab, changeSelectedArticle, selectedTab, openBottomSeet])

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

  const lastScrollTop = useRef(0)
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollTop < lastScrollTop.current || scrollTop === 0) {
      // down
      setShowArticleTitle(false)
    } else {
      // up
      setShowArticleTitle(true)
    }
    lastScrollTop.current = scrollTop
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
  useEffect(() => {
    setIsMoreIconVisible(headerRef.current?.scrollWidth > headerRef.current?.clientWidth)
  }, [])
  return <div className={styles.container} ref={headerRef}>
    <div className={
      combineClassNames(
        styles.tabContainer,
        showArticleTitle 
        ? styles.up
        : styles.down
      )
    }>
      {
        tabs
      }
      {/* <img src={icMore} className={styles.moreIcon}/> */}
    </div>
    <div className={
      combineClassNames(
        styles.articleTitle,
        showArticleTitle 
        ? styles.up
        : styles.down
      )
    }>{articleTitle}</div>
  </div>
}