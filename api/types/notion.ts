export type ArticleInfo = {
  articleUrl: string
  articleId: string
  createdTime: string
  lastEditedTime: string
  title: string
  tag: {
    id: string
    name: string
    color: string
  }[],
  content?: string
}