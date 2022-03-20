let parentWindow
let parentOrigin
let iframeWindow
let iframeOrigin

const INIT_IFRAME_MSG = 'iframe_init_msg'

const init = (successCb) => {
  // 接受 iframe 的信息
  listenIframe(INIT_IFRAME_MSG, (evt, _data) => {
    const {
      data,
      origin,
      source: iframeSource
    } = evt
    successCb(evt, _data)
    iframeWindow = iframeSource
    iframeOrigin = origin
  })
}

const _ensureInit = () => {
  if (!parentWindow || !iframeWindow || !parentOrigin || !iframeOrigin) {
    throw '还没初始化 iframe 通信对象'
  }
}

const parentToIframe = (data) => {
  _ensureInit()
  iframeWindow.postMessage(
    JSON.stringify({
      data
    }),
    iframeOrigin
  )
}

const listenIframe = (
  message,
  msgHandler
) => {
  const _msgHandler = (evt) => {
    try {
      const data = JSON.parse(evt.data)
      if (data.msg === message) {
        msgHandler(evt, data.data)
      }
    } catch (err) {

    }

  }
  window.addEventListener('message', _msgHandler, false)
}

export const IframeCommunication = {
  // 先建立一次通信，获取 iframe 的引用，iframe 里面必须约定一个 初始 message
  init,

  _ensureInit,

  parentToIframe,

  listenIframe
}