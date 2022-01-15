import React, { AllHTMLAttributes, useCallback, useEffect } from 'react'

export const useRewriteAnchors = (
  rootDocNodeId: string,
  rewriteAnchorAttributes: Record<string, (oldValue: any, AnchorNode: HTMLAnchorElement) => any>,
  isContentLoading: boolean,
  onClick?: (oldHref: string, AnchorNode: HTMLAnchorElement) => void
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
            anchorNodes[i].getAttribute('href') ?? '',
            anchorNodes[i]
          ))
        }
        Object.entries(rewriteAnchorAttributes).forEach(([k, vCreator]) => {
          anchorNodes[i].setAttribute(
              k,
              vCreator(
                anchorNodes[i].getAttribute(k) ?? '',
                anchorNodes[i]
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