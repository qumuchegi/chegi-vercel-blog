import { useNaviToHome } from '@/routes/category/home'
import { useStore } from '@/store';
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getNotionArticleRecordMaps } from '@/api'
import { NotionRenderer } from 'react-notion-x'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
// // used for code syntax highlighting (optional)
// import 'prismjs/themes/prism-tomorrow.css'
// // used for collection views (optional)
// import 'rc-dropdown/assets/index.css'
// // used for rendering equations (optional)
// import 'katex/dist/katex.min.css'
import styles from './styles.module.less'
import './rewriteNotionXStyle.less'

export default function ArticleContent() {
  const params: { articleId: string } = useParams()
  const [isLoadind, setisLoading] = useState(false)
  const [articleBlocks, setArticleBlocks] = useState<any>()
  const selectedArticleId = useStore(state => state.uiState.selectedArticleId)
  const changeSelectedArticle = useStore(state => state.uiState.actions.changeSelectedArticle)
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
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    })
  }, [params])
  return <div className={styles.contentContainer}>
    {
      isLoadind ?
        <div>loading...</div>
      : ( articleBlocks &&
        <NotionRenderer
          recordMap={articleBlocks}
          fullPage={false}
          darkMode={false}
          className={styles.content}
        />)
    }
  </div>
}