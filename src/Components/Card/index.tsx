import React from 'react'
import styles from './style.module.less'

export default function Card({
  children
}: {
  children: React.ReactChild
}) {

  return <div className={styles.container}>
    {children}
  </div>
}