export type Tabs = {
  title: string,
  tabId: string,
  detailsNotionId: string,
  children?: Tabs
}[]