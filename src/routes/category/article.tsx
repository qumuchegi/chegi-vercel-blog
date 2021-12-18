import React, { lazy, useCallback } from 'react'
import { RouteItem } from '../types'
import { Loadable } from '../render'
import { useHistory } from 'react-router-dom'

const ArticlContentRoue: RouteItem = {
  title: 'article content',
  path: '/article-list/:tabId/article-content/:articleId',
  component: <Loadable
    LazyComponent={
      lazy(
        () => import(
          /*Article content */ '@/pages/ArticleContent'
        )
      )
    }
  />
}
const ArticleRoute: RouteItem = {
  title: 'articlelist',
  path: '/article-list/:tabId',
  component: <Loadable
    LazyComponent={
      lazy(
        () => import(
          /*  ArticleList */ '@/pages/ArticleList'
        )
      )
    }
    childRoutes={[ArticlContentRoue]}
    childrenLayout='horzontal'
  />
}

export const useNaviToArticleList = () => {
  const history =  useHistory()
  return useCallback(
    (
      params: {
        tabId: string
      }
    ) => {
      history.push('/article-list/' + params?.tabId)
    },
    [history]
  )
}
export const useNaviToArticleDetail = () => {
  const history =  useHistory()
  return useCallback(
    (
      params: {
        tabId: string,
        articleId: string
      }
    ) => {
      history.push(`/article-list/${params?.tabId}/article-content/${params?.articleId}`)
    },
    [history]
  )
}
export default ArticleRoute