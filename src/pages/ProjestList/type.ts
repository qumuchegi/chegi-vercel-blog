export type Tabs = {
  title: string,
  tabId: string,
  detailsMarkdownString: string,
  children?: Tabs
}[]