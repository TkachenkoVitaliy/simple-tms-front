export function swapArrayItems<T = unknown>(
  array: Array<T>,
  indexFirst: number,
  indexSecond: number,
): Array<T> {
  const newArray = [...array]
  newArray[indexFirst] = array[indexSecond]
  newArray[indexSecond] = array[indexFirst]
  return newArray
}
