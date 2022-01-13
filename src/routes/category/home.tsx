import React, { lazy, useCallback } from 'react'
import { RouteItem } from '../types'
import ArticleRoute, { RenderArticleWithNotionId } from './article'
import { Loadable } from '../render'
import { useHistory } from 'react-router-dom'

const WelcomeRoute: RouteItem = {
  title: 'welcome page',
  path: '/home',
  exact: true,
  component: <Loadable
    LazyComponent={
      lazy(
        () => import(
          /*welcome*/ '@/pages/Welcome'
        )
      )
    }
  />
}
const HomeRoute: RouteItem = {
  title: `chegi's blog`,
  path: '/home',
  component: 
    <Loadable
      LazyComponent={
        lazy(
          () => import(
            /*  Home */ '@/pages/Home'
          )
        )
      }
      childRoutes={[
        WelcomeRoute,
        ArticleRoute
      ]}
    />
}
export const useNaviToHome = () => {
  const history =  useHistory()
  return useCallback(
    () => {
      history.push('/home')
    },
    [history]
  )
}
export default HomeRoute
