import React, { useState, useCallback, useMemo } from 'react'
import styles from './style.module.less'

type Option = {
  key: string,
  value: string
}
interface Props {
  options: Option[],
  onSelect?: (option: Option) => void,
  onInput?: (inputValue: string) => void,
  onSearchComplete?: (options: Option[]) => void
}
export default function SearchSelect({
  options = [],
  onSelect,
  onInput,
  onSearchComplete
}: Props) {
  const [seachResult, setSeachResult] = useState<Option[]>()
  const handleInput = useCallback((e) => {
    e.persist()
    if (onInput) {
      return onInput(e.target.value)
    }
    if (e.target.value === '' || !e.target.value) return setSeachResult(undefined)
    const reg = new RegExp(`${e.target.value}`, 'ig')
    setSeachResult(options.filter(i => reg.test(i.value)))
  }, [onInput])
  return <div>
    <input onChange={handleInput} type='text'/>
    <div>
      {
        seachResult?.map(({
          key,
          value
        }) => {
          return <div key={key}>{value}</div>
        })
      }
    </div>
  </div>
}