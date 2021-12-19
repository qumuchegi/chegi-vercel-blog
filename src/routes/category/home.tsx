import React, { lazy, useCallback } from 'react'
import { RouteItem } from '../types'
import ArticleRoute from './article'
import { Loadable } from '../render'
import { useHistory } from 'react-router-dom'

const WelcomeRoute: RouteItem = {
  title: 'welcome page',
  path: '/',
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
  path: '/',
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
      history.push('/')
    },
    [history]
  )
}
export default HomeRoute
