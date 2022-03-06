import React, { useCallback, useState } from 'react'
import { Tabs } from './type'

interface IProps {
  projectTitle: string,
  projectGithubUrl: string,
  sideBarTabs: Tabs
}

export default function ProjectDetails(props: IProps) {
  const [selectTab, setSelectTab] = useState<{
    tabId: string,
    tabTitle: string,
    tabContent: string
  }>()
  const onSelectTab = useCallback((
    tabId: string, tabTitle: string, content: string
  ) => {
    setSelectTab({
      tabId, tabTitle, tabContent: content
    })
  }, [])
  return <div>
    <h2>{props.projectTitle}</h2>
    <div>github: {props.projectGithubUrl}</div>
    <div>
      <TabsTree tabs={props.sideBarTabs} onClickTab={onSelectTab}/>
      <div>
        <h4>{selectTab?.tabTitle}</h4>
        <p>
          {
            
          }
        </p>
      </div>
    </div>
  </div>
}

function TabsTree({
  tabs,
  onClickTab
}: {
  tabs: Tabs,
  onClickTab: (tabId: string, tabTitle: string, content: string) => void
}) {
  const _onClickTab = useCallback((tabId, tabTitle, content) => {
    onClickTab(tabId, tabTitle, content)
  }, [])
  return <div>
    {
      tabs.map(({
        title,
        tabId,
        detailsMarkdownString,
        children = []
      }) => {
        if (children?.length > 0) {
          return <details key={tabId}>
            <summary>{title}</summary>
            <div>
              <TabsTree tabs={children} onClickTab={onClickTab}/>
            </div>
          </details>
        } else {
          return <div onClick={() => _onClickTab(tabId, title, detailsMarkdownString)}>{title}</div>
        }
      })
    }
  </div>
}