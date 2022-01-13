import React, { lazy, useCallback } from 'react'
import { RouteItem } from '../types'
import { Loadable } from '../render'
import { useHistory } from 'react-router-dom'

const ArticlContentRoue: RouteItem = {
  title: 'article content',
  path: '/home/article-list/:tabId/article-content/:articleId',
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
export const RenderArticleWithNotionId: RouteItem = {
  title: 'notion article content',
  path: '/notion-article/:articleId',
  component: <Loadable
    LazyComponent={
      lazy(
        () => import(
          /*Article content */ '@/pages/ArticleContentWithId'
        )
      )
    }
  />
}
const ArticleRoute: RouteItem = {
  title: 'articlelist',
  path: '/home/article-list/:tabId',
  component: <Loadable
    LazyComponent={
      lazy(
        () => import(
          /*  ArticleList */ '@/pages/ArticleList'
        )
      )
    }
    childRoutes={[ArticlContentRoue]}
    childrenLayout={
      window.screen.availWidth < 768
      ? 'verticle' : 'horzontal'
    }
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
      history.push('/home/article-list/' + params?.tabId)
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
      history.push(`/home/article-list/${params?.tabId}/article-content/${params?.articleId}`)
    },
    [history]
  )
}
export const useNaviToArticleContentWithSingleId = () => {
  const history =  useHistory()
  return useCallback(
    (
      params: {
        articleId: string
      }
    ) => {
      history.push(`/notion-article/${params?.articleId}`)
    },
    [history]
  )
}

export default ArticleRoute
