/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
export function swapArrayItems<T = any>(
  array: Array<T>,
  indexFirst: number,
  indexSecond: number,
): Array<T> {
  const newArray = [...array]
  newArray[indexFirst] = array[indexSecond]
  newArray[indexSecond] = array[indexFirst]
  return newArray
}
