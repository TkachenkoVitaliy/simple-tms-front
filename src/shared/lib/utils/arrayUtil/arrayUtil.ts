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

export function flattenArray<T = unknown, R = unknown>(
  array: T[],
  mapFunc: (arg: T) => R,
  childrenFunc: (arg: T) => T[] | undefined,
): R[] {
  return array.reduce((acc: R[], curr: T) => {
    const item = mapFunc(curr)
    acc.push(item)
    const children = childrenFunc(curr)
    if (children !== undefined) {
      acc.push(...flattenArray(children, mapFunc, childrenFunc))
    }
    return acc
  }, [])
}
