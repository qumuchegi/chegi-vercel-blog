import React, { useReducer, useContext, createContext, useCallback, useMemo } from 'react'
import { ArticleInfo, Store, TabArticles } from './type'

const defaultContextValue: Store = {
  uiState: {
    isNarrowDevice: false,
    selectedTab: '',
    selectedArticleId: '',

    actions: {
      changeSelectedTab: (tabName: string) => { },
      changeSelectedArticle: (articleId: string) => { },
    }
  },
  articles: {
    tabArticles: {},
    actions: {
      getArticlesByTabName: () => {},
      recordTabBlogs: () => {}
    }
  }
}
const storeContext = createContext(defaultContextValue)
type Action = {
  type: string,
  payload: any
}
const rootReducer = (state: Store = defaultContextValue, action: Action) => {
  switch (action.type) {
    case 'recordTabBlogs': return {
      ...state,
      articles: {
        ...state.articles,
        tabArticles: action.payload.tabArticles
      }
    }
    case 'changeTab': return {
      ...state,
      uiState: {
        ...state.uiState,
        selectedTab: action.payload.selectedTab
      }
    }
    case 'changeArticle': return {
      ...state,
      uiState: {
        ...state.uiState,
        selectedArticleId: action.payload.articleId
      }
    }
    default: return state
  }
}
const ConnectStore = ({ children }: { children: React.ReactChild }) => {
  const [store, dispatch] = useReducer(rootReducer, defaultContextValue)
  const recordTabBlogs = useCallback(
    (tabArticles: TabArticles) => {
      dispatch({
        type: 'recordTabBlogs',
        payload: {
          tabArticles: tabArticles ?? {}
        }
      })
    },
    []
  )
  const getArticlesByTabName = useCallback(
    (tabName: string) => {
      return store.articles.tabArticles[tabName]
    }, [store]
  )
  const changeSelectedTab = useCallback((tabName: string) => {
    dispatch({ type: 'changeTab', payload: { selectedTab: tabName }})
  }, [])
  const changeSelectedArticle = useCallback((articleId: string) => {
    dispatch({ type: 'changeArticle', payload: { articleId }})
  }, [])
  return <storeContext.Provider value={
    useMemo(() => ({
      ...store,
      uiState: {
        ...store.uiState,
        isNarrowDevice: (window.screen.availWidth < 768),
        actions: {
          changeSelectedTab,
          changeSelectedArticle
        }
      },
      articles: {
        ...store.articles,
        actions: {
          recordTabBlogs,
          getArticlesByTabName
        }
      }
    }), [recordTabBlogs, store, changeSelectedTab, changeSelectedArticle])
  }>
    {children}
  </storeContext.Provider>
}

export const useStore = (getStatePiece: (state: Store) => any) => {
  const state = useContext(storeContext)
  return getStatePiece(state)
}

export default ConnectStore

