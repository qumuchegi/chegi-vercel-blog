import React, { useCallback, useEffect, useRef } from 'react';
import styles from './styles.module.less'
import './anim.less'

enum AnimType {
  Jump = 'jump',
  Pop = 'pop'
}

export default function Welcome() {
  const h1TextRef = useRef<any>()
  const playAnim =  useCallback(
    (animType: AnimType) => {
      h1TextRef.current.innerHTML = h1TextRef.current.textContent.replace(/\S/g, "<span>$&</span>")
      document.querySelectorAll('span').forEach((span, index) => {
        span.style.setProperty('--delay', `${index * 0.1}s`)
      })
      h1TextRef.current.style.setProperty(
        '--animation',
        animType
      )
      
      h1TextRef.current.classList.remove('animate')
      void h1TextRef.current.offsetWidth
      h1TextRef.current.classList.add('animate')
    },
    []
  )
  useEffect(() => {
    playAnim(AnimType.Jump)
  }
  , [playAnim])
  return <div className={styles.container} onClick={() => playAnim(AnimType.Pop)}>
    <div className={styles.hello}>
      <h1 ref={h1TextRef} id='anim-h1'>welcome to chegi's space</h1>
    </div>
  </div>
}