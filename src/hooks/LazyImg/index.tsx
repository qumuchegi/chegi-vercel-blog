import React, { useEffect, useState } from 'react'
import './style.less'

interface Props {
  container: HTMLDivElement
}
export function useLazyImgLoading({
  container
}: Props) {
  useEffect(() => {
    if (!container) {
      return
    }
    const imgNodeList = container.getElementsByTagName('img')
    console.log({
      imgNodeList
    });
    for(let i=0; i < imgNodeList.length; i++) {
      const imgNode = imgNodeList[i]
      imgNode.className = 'hide-img'
      imgNode.onload = () => {
        setTimeout(() => {
          imgNode.className = 'show-img'
        }, 2000)
      }
    }
    imgNodeList
  }, [container])
}