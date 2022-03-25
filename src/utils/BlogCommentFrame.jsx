import React, { useEffect, useCallback } from 'react'
import { IframeCommunication } from './iframe'

function BlogCommentFrame({
  commentDeployHost,
  pageId,
  auth = ['anonymous'] // 'github', 'anonymous'
}) {
  const IFRAME_ID = 'comment-iframe' + commentDeployHost + pageId

  useEffect(() => {
    IframeCommunication.init(
      (evt, data) => {}
    )
  }, [])

  useEffect(() => {
    IframeCommunication.listenIframe(
      'send_iframe_height',
      (evt, data) => {
        // console.log({evt, data});
        document.getElementById(IFRAME_ID).style.height = Number(data.height) + 50 + 'px'
      }
    )
  }, [])

  return (
    <div className="App">
      <iframe
        src={`${commentDeployHost}/?articleId=${pageId}&auth=${auth}&parentHref=${window.location.href}`}
        id={IFRAME_ID}
        style={{
          width: '100%',
          border: '0px',
          minHeight: '500px',
          scrollbarWidth: 'none',
          paddingBottom: '30px'
        }}
        frameBorder='0'
      />
    </div>
  );
}
export default BlogCommentFrame

// BlogCommentShell 用于非 React 项目
export const BlogCommentShell = ({
  containerId,
  commentDeployHost,
  pageId,
  auth = ['anonymous'] // 'github', 'anonymous'
}) => {
  const IFRAME_ID = 'comment-iframe' + commentDeployHost + pageId

  const iframe = document.createElement('iframe')
  iframe.src = `${commentDeployHost}/?articleId=${pageId}&auth=${auth}&parentHref=${window.location.href}` //`${commentDeployHost}/?articleId=${pageId}&auth=${auth}`
  iframe.id = IFRAME_ID
  iframe.style = `
    width: 100%;
    border: 0px;
    min-height: 500px;
    scrollbar-width: none;
    padding-bottom: 30px
  `
  iframe.frameBorder = 0

  const mountCommentIframeAndAddListener = () => {
    const container = document.getElementById(containerId)
    if (!container) return
    container && container.appendChild(iframe)

    IframeCommunication.init(
      (evt, data) => {}
    )
    IframeCommunication.listenIframe(
      'send_iframe_height',
      (evt, data) => {
        // console.log({evt, data});
        document.getElementById(IFRAME_ID).style.height = Number(data.height) + 50 + 'px'
      }
    )
  }
  const observer = new MutationObserver(() => {
    mountCommentIframeAndAddListener()
    observer.disconnect()
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  })

  window.addEventListener('popstate', function(e) {
    mountCommentIframeAndAddListener()
  })

  window.addEventListener('pushstate', function(e) {
    mountCommentIframeAndAddListener()
  })
  window.addEventListener('replacestate', function(e) {
    mountCommentIframeAndAddListener()
  })
}