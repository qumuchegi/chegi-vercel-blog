import React, { useCallback, useEffect, useRef } from 'react';
import styles from './styles.module.less'
import Loading, { AnimType } from '@/Components/Loading'

export default function Welcome() {
  return <div className={styles.container}>
    <div className={styles.hello}>
      <Loading text="welcome to chegi's space" infinite={true} animType={AnimType.Pop}/>
    </div>
  </div>
}