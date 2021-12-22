export const repeatArr = (item: any, num: number, warpItem?: (item: any, index: number) => any) => {
  return new Array(num).fill(item).map(warpItem || (() => item))
}