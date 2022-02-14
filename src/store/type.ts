export type ArticleInfo = {
  articleUrl: string
  articleId: string
  createdTime: string
  lastEditedTime: string
  title: string
  tag: {
    multi_select: {
      id: string
      name: string
    }[]
  },
  content?: string
}

export type TabArticles = {
  [tabName: string]: ArticleInfo[]
}

export type Store = {
  uiState: {
    isNarrowDevice: boolean // 是否是窄屏
    selectedTab: string
    selectedArticleId: string
    actions: {
      changeSelectedTab: (tabName: string) => void
      changeSelectedArticle: (articleId: string) => void
      setBottomSheetChildren: (bottomSheetChild: JSX.Element, header?: JSX.Element) => void
      closeBottomSheet: () => void
    }
  },
  articles: {
    tabArticles: TabArticles,
    actions: {
      getArticlesByTabName: (tabName: string) => any,
      recordTabBlogs: (tabArticles: TabArticles) => void,
      getArticleInfo: (articleId: string) => ArticleInfo | null
    }
  }
}