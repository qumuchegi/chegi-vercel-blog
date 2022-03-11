import React, { useRef, useState, useEffect, useCallback, RefObject } from 'react'
import { getNotionArticleRecordMaps } from '@/api'
import { NotionRenderer, Equation, Collection, CollectionRow } from 'react-notion-x'
import Code from '@/Components/Code'
import 'react-notion-x/src/styles.css'
import styles from './styles.module.less'
import './rewriteNotionXStyle.less'
import { combineClassNames } from '@/utils/style';
import Skeleton from '@/Components/Skeleton';
import { useRewriteAnchors } from '@/hooks'

export default function NotionContentRenderer({
  notionId
}: {
  notionId: string
}) {
  const [isLoading, setisLoading] = useState(false)
  const [articleBlocks, setArticleBlocks] = useState<any>()

  const fetchArticleContent = useCallback(
    async () => {
      setisLoading(true)
      const res: any = await getNotionArticleRecordMaps(notionId)
      setisLoading(false)
      if (res) {
        setArticleBlocks(res.articleRecordMap)
      }
    },
    [notionId]
  )
  useEffect(() => {
    fetchArticleContent()
  }, [fetchArticleContent])

  useRewriteAnchors(
    'article-content',
    {
      onclick: (_, anchor) => {
        const outSiteLink = /^http/.test(anchor.getAttribute('href') ?? '')
        if (outSiteLink) {
        } else {
          return 'return false'
        }
      }
    },
    isLoading
  )

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
      ( articleBlocks &&
        <div id='article-content'>
          <NotionRenderer
            recordMap={articleBlocks}
            // fullPage={false}
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