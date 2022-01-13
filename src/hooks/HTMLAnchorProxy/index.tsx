import React, { AllHTMLAttributes, useCallback, useEffect } from 'react'

export const useRewriteAnchors = (
  rootDocNodeId: string,
  rewriteAnchorAttributes: Record<string, (oldValue?: any) => any>,
  isContentLoading: boolean,
  onClick?: (oldHref: string) => void
) => {
  const rewrite = useCallback(
    () => {
      const rootNode = document.getElementById(rootDocNodeId)
      const anchorNodes = rootNode?.getElementsByTagName('a')
      if (!anchorNodes) {
        return
      }
      for(let i = 0; i < anchorNodes.length; i++) {
        if (onClick) {
          anchorNodes[i].addEventListener('click', () => onClick(
            anchorNodes[i].getAttribute('href') ?? ''
          ))
        }
        Object.entries(rewriteAnchorAttributes).forEach(([k, vCreator]) => {
          anchorNodes[i].setAttribute(
              k,
              vCreator(
                anchorNodes[i].getAttribute(k) ?? ''
              )
            )
        })
      }
    },
    [isContentLoading, rootDocNodeId]
  )
  useEffect(() => {
    setTimeout(() => {
      rewrite()
    }, 500)
  }, [rewrite])
}