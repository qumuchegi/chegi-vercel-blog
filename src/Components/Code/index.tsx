import React, { useMemo } from 'react'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-jsx'
import '@/assets/prism.css'
import '@/assets/prism.js'
import { combineClassNames } from '@/utils/style'
import styles from './styles.module.less'

export default function Code(props: any) {
  const {
    code,
    language
  } = props
  const languageL = language.toLowerCase()
  const prismLanguage = languages[languageL] || languages.javascript
  return <pre
    className={
      useMemo(() => combineClassNames(
        'notion-code',
        styles.container
      ), [])
    }
  >
    <code
      className={
        useMemo(() => combineClassNames(
          "language-" + languageL,
          styles.code
        ), [])
      }
      dangerouslySetInnerHTML={useMemo(() => (
        {
          __html:
            highlight(code, prismLanguage, language)
        }
      ), [code, prismLanguage, language])}
    >
    </code>
  </pre>
}