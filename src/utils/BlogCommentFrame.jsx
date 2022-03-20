
import React, { useEffect, useCallback } from 'react'
import { IframeCommunication } from './iframe'
import { entriesToObj } from './object'
import { appendCookie, readCookie } from './cookie'

function BlogCommentFrame({
  commentDeployHost,
  pageId,
  auth = ['anonymous'] // 'github', 'anonymous'
}) {
  const IFRAME_ID = 'comment-iframe' + commentDeployHost + pageId
  const bindGithubAuthRedirectListener = useCallback((githubAuthClientId) => {
    const PARENT_GITHUB_AUTH_MSG_START = 'PARENT_GITHUB_AUTH_MSG_START'
    IframeCommunication.listenIframe(
      PARENT_GITHUB_AUTH_MSG_START,
      (evt, data) => {
        const url = `https://github.com/login/oauth/authorize?client_id=${githubAuthClientId}`
          + (
            `&redirect_uri=${`${commentDeployHost}/api/githubLoginCallback?redirect_url=` + encodeURIComponent(window.location.href)}`
          )
        window.location.href = url
      }
    )
  }, [])
  useEffect(() => {
    IframeCommunication.init(
      (evt, data) => {
        onIframeLoaded()
        console.log({evt, data});
        bindGithubAuthRedirectListener(data.githubAuthClientId)
      }
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

  const sendGithubAuthInfo = useCallback((
    userHomeUrl,
    auth_username,
    auth_avatar,
    auth_token,
    github_userid
  ) => {
    document.getElementById(IFRAME_ID).contentWindow.postMessage(
      JSON.stringify({
        msg: 'forward-github-auth-info',
        data: {
          userHomeUrl,
          auth_username,
          auth_avatar,
          auth_token,
          github_userid
        }
      }),
      '*'
    )
  }, [])

  const onIframeLoaded = useCallback(
    () => {
      const maybeCookie = readCookie()
      // console.log({
      //   maybeCookie
      // });
      if (maybeCookie.userHomeUrl) {
        const {
          userHomeUrl,
          auth_username,
          auth_avatar,
          auth_token,
          github_userid
        } = maybeCookie
        sendGithubAuthInfo(
          userHomeUrl,
          auth_username,
          auth_avatar,
          auth_token,
          github_userid
        )
      } else {
        const {
          userHomeUrl,
          auth_username,
          auth_avatar,
          auth_token,
          github_userid
        } = entriesToObj(document.location.search.slice(1), '&')
        appendCookie([
          {
            key: 'userHomeUrl',
            value: userHomeUrl
          },
          {
            key: 'auth_username',
            value: auth_username
          },
          {
            key: 'auth_avatar',
            value: auth_avatar
          },
          {
            key: 'auth_token',
            value: auth_token
          },
          {
            key: 'github_userid',
            value: github_userid
          }
        ])
        // if (userHomeUrl) {
        //   removeSearch([
        //     'userHomeUrl',
        //     'auth_username',
        //     'auth_avatar',
        //     'auth_token',
        //     'github_userid'
        //   ])
        // }
        sendGithubAuthInfo(
          userHomeUrl,
          auth_username,
          auth_avatar,
          auth_token,
          github_userid
        )
      }
    },
    [sendGithubAuthInfo]
  )

  return (
    <div className="App">
      <iframe
        src={`${commentDeployHost}/?articleId=${pageId}&auth=${auth}`}
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
  const bindGithubAuthRedirectListener = (githubAuthClientId) => {
    const PARENT_GITHUB_AUTH_MSG_START = 'PARENT_GITHUB_AUTH_MSG_START'
    IframeCommunication.listenIframe(
      PARENT_GITHUB_AUTH_MSG_START,
      (evt, data) => {
        const url = `https://github.com/login/oauth/authorize?client_id=${githubAuthClientId}`
          + (
            `&redirect_uri=${`${commentDeployHost}/api/githubLoginCallback?redirect_url=` + encodeURIComponent(window.location.href)}`
          )
        window.location.href = url
      }
    )
  }
  const sendGithubAuthInfo = (
    userHomeUrl,
    auth_username,
    auth_avatar,
    auth_token,
    github_userid
  ) => {
    document.getElementById(IFRAME_ID).contentWindow.postMessage(
      JSON.stringify({
        msg: 'forward-github-auth-info',
        data: {
          userHomeUrl,
          auth_username,
          auth_avatar,
          auth_token,
          github_userid
        }
      }),
      '*'
    )
  }
  const onIframeLoaded = () => {
    const maybeCookie = readCookie()
    // console.log({
    //   maybeCookie
    // });
    if (maybeCookie.userHomeUrl) {
      const {
        userHomeUrl,
        auth_username,
        auth_avatar,
        auth_token,
        github_userid
      } = maybeCookie
      sendGithubAuthInfo(
        userHomeUrl,
        auth_username,
        auth_avatar,
        auth_token,
        github_userid
      )
    } else {
      const {
        userHomeUrl,
        auth_username,
        auth_avatar,
        auth_token,
        github_userid
      } = entriesToObj(document.location.search.slice(1), '&')
      appendCookie([
        {
          key: 'userHomeUrl',
          value: userHomeUrl
        },
        {
          key: 'auth_username',
          value: auth_username
        },
        {
          key: 'auth_avatar',
          value: auth_avatar
        },
        {
          key: 'auth_token',
          value: auth_token
        },
        {
          key: 'github_userid',
          value: github_userid
        }
      ])
      // if (userHomeUrl) {
      //   removeSearch([
      //     'userHomeUrl',
      //     'auth_username',
      //     'auth_avatar',
      //     'auth_token',
      //     'github_userid'
      //   ])
      // }
      sendGithubAuthInfo(
        userHomeUrl,
        auth_username,
        auth_avatar,
        auth_token,
        github_userid
      )
    }
  }

  const iframe = document.createElement('iframe')
  iframe.src = `${commentDeployHost}/?articleId=${pageId}&auth=${auth}`
  iframe.id = IFRAME_ID
  iframe.style = `
    width: 100%;
    border: 0px;
    min-height: 500px;
    scrollbar-width: none;
    padding-bottom: 30px
  `
  iframe.frameBorder = 0

  const observer = new MutationObserver(() => {
    const container = document.getElementById(containerId)
    console.log({
      containerId,
      container
    });
    if (!container) return
    container && container.appendChild(iframe)
    observer.disconnect()
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  window.onload = () => {

    IframeCommunication.init(
      (evt, data) => {
        onIframeLoaded()
        console.log({evt, data});
        bindGithubAuthRedirectListener(data.githubAuthClientId)
      }
    )
    IframeCommunication.listenIframe(
      'send_iframe_height',
      (evt, data) => {
        // console.log({evt, data});
        document.getElementById(IFRAME_ID).style.height = Number(data.height) + 50 + 'px'
      }
    )
  }
}

