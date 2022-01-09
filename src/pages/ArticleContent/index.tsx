import { useStore } from '@/store';
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getNotionArticleRecordMaps } from '@/api'
import { NotionRenderer, Equation, Collection, CollectionRow } from 'react-notion-x'
import Code from '@/Components/Code'
import 'react-notion-x/src/styles.css'
import styles from './styles.module.less'
import './rewriteNotionXStyle.less'
import Loading from '@/Components/Loading';
import { combineClassNames } from '@/utils/style';
import Skeleton from '@/Components/Skeleton';
import { ArticleInfo } from '@/store/type';
import { useLazyImgLoading } from '@/hooks'

export default function ArticleContent() {
  const params: { articleId: string } = useParams()
  const [isLoading, setisLoading] = useState(false)
  const [articleInfo, setArticleInfo] = useState<ArticleInfo>()
  const [articleBlocks, setArticleBlocks] = useState<any>()
  const selectedArticleId = useStore(state => state.uiState.selectedArticleId)
  const changeSelectedArticle = useStore(state => state.uiState.actions.changeSelectedArticle)
  const getArticleInfo = useStore(state => state.articles.actions.getArticleInfo)
  useEffect(() => {
    changeSelectedArticle(params.articleId)
  }, [params])
  const fetchArticleContent = useCallback(
    async () => {
      if (!selectedArticleId) {
        return
      }
      setisLoading(true)
      const res: any = await getNotionArticleRecordMaps(selectedArticleId)
      setisLoading(false)
      if (res) {
        setArticleBlocks(res.articleRecordMap)
      }
    },
    [selectedArticleId]
  )
  useEffect(() => {
    fetchArticleContent()
  }, [fetchArticleContent])
  useEffect(() => {
    const _articleInfo = getArticleInfo(params.articleId) || {}
    window.document.title = _articleInfo.title
    setArticleInfo(_articleInfo)
  }, [params, getArticleInfo])
  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    })
  }, [params])
  // useLazyImgLoading({
  //   //@ts-ignore
  //   container: document.getElementById('article-content')
  // })
  return <div className={styles.contentContainer}>
    <Skeleton className={
      combineClassNames(
        styles.loadingSkeleton,
        styles.loadingSkeleton_header
      )
    } showSkeleton={isLoading} />
    <Skeleton className={
      combineClassNames(
        styles.loadingSkeleton,
        styles.loadingSkeleton_content
      )
    } showSkeleton={isLoading} />
    <Skeleton className={
      combineClassNames(
        styles.loadingSkeleton,
        styles.loadingSkeleton_footer
      )
    } showSkeleton={isLoading} />
    {
      !isLoading &&
      articleBlocks && 
      <h2 className={styles.title}>
        {articleInfo?.title}
      </h2>
    }
    {
      !isLoading &&
      ( articleBlocks &&
        <div id='article-content'>
          <NotionRenderer
            recordMap={articleBlocks}
            fullPage={false}
            darkMode={false}
            showTableOfContents
            disableHeader
            showCollectionViewDropdown={false}
            // rootDomain
            previewImages
            className={styles.content}
            components={{
              equation: Equation,
              code: Code,
              collection: Collection, 
              collectionRow: CollectionRow
            }}
          />
        </div>
        )
    }
  </div>
}