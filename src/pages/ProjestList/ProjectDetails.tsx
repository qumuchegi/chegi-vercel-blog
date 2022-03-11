import React, { useCallback, useState } from 'react'
import { Tabs } from './type'
import NotionContentRenderer from '@/Components/NotionContentRenderer'

interface IProps {
  projectTitle: string,
  projectGithubUrl: string,
  sideBarTabs: Tabs
}

export default function ProjectDetails(props: IProps) {
  const [selectTab, setSelectTab] = useState<{
    tabId: string,
    tabTitle: string,
    detailsNotionId: string
  }>()
  const onSelectTab = useCallback((
    tabId: string, tabTitle: string, detailsNotionId: string
  ) => {
    setSelectTab({
      tabId, tabTitle, detailsNotionId: detailsNotionId
    })
  }, [])
  return <div>
    <h2>{props.projectTitle}</h2>
    <div>github: {props.projectGithubUrl}</div>
    <div>
      <TabsTree tabs={props.sideBarTabs} onClickTab={onSelectTab}/>
      <div>
        <h4>{selectTab?.tabTitle}</h4>
        {
          selectTab
          && <NotionContentRenderer notionId={selectTab.detailsNotionId}/>
        }
      </div>
    </div>
  </div>
}

function TabsTree({
  tabs,
  onClickTab
}: {
  tabs: Tabs,
  onClickTab: (tabId: string, tabTitle: string, detailsNotionId: string) => void
}) {
  const _onClickTab = useCallback((tabId, tabTitle, detailsNotionId) => {
    onClickTab(tabId, tabTitle, detailsNotionId)
  }, [])
  return <div>
    {
      tabs.map(({
        title,
        tabId,
        detailsNotionId,
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
          return <div onClick={() => _onClickTab(tabId, title, detailsNotionId)}>{title}</div>
        }
      })
    }
  </div>
}