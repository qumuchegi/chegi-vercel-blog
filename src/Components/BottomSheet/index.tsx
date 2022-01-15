import { combineClassNames } from '@/utils/style'
import React, { useState, useImperativeHandle, forwardRef, useCallback } from 'react'
import styles from './style.module.less'

interface IProps {
  header?: JSX.Element,
  children?: JSX.Element
}
export type BottomSheetHandle = {
  open: () => void,
  close: () => void
}
export default forwardRef(BottomSheet)

function BottomSheet(
  {
    header,
    children
  }: IProps,
  ref: any
) {
  const [containerStyleClassName, toogleContainerStyleClassName] = useState<string>(styles.close)
  const onRequestClose = useCallback(
    () => {
      toogleContainerStyleClassName(styles.close)
    },
    []
  )
  const onRequestOpen = useCallback(
    () => {
      toogleContainerStyleClassName(styles.open)
    },
    []
  )

  useImperativeHandle(ref, () => ({
    open: onRequestOpen,
    close: onRequestClose
  }))

  return <div className={
    combineClassNames(
      styles.outerContainer,
      containerStyleClassName
    )}>
  <div className={styles.container}>
    <div className={styles.background} onClick={onRequestClose} onScroll={() => {return false}}/>
    <div className={styles.bottomSheet}>
      <div className={styles.header}>
        {
          header
          ?? <div className={styles.line}></div>
        }
      </div>
      <div className={
        combineClassNames(
          styles.content
        )
      }>
        {children}
      </div>
    </div>
  </div>
  </div>
}