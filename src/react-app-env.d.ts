/// <reference types="react-scripts" />
declare module '*.module.less' {
  const classes: { [key: string]: string }
  export default classes
}
declare module '*.less'
declare const __DEV__: boolean