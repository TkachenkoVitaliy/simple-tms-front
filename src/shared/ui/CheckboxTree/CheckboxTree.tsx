import { CheckboxTreeNode } from 'shared/ui/CheckboxTree/CheckboxTreeNode'
import { CheckboxTreeContext } from 'shared/ui/CheckboxTree/CheckboxTreeContext'
import { flattenArray } from 'shared/lib/utils/arrayUtil/arrayUtil'
import { useCallback, useMemo } from 'react'

export interface CheckboxTreeProps<T> {
  data: T[]
  getId: (item: T) => string | number
  getChildren: (item: T) => T[] | undefined
  depth?: number
  indent?: number
  getLabel: (item: T) => string
}
export function CheckboxTree<T>(props: CheckboxTreeProps<T>) {
  const { data, ...nodeProps } = props
  const { getId, getChildren, depth } = nodeProps

  const contextValue = useMemo(
    () =>
      flattenArray(
        data,
        (arg) => {
          const children = getChildren(arg)
          return {
            id: getId(arg).toString(),
            hasChildren: children !== undefined && children.length > 0,
          }
        },
        (arg) => getChildren(arg),
      )
        .filter(({ hasChildren }) => hasChildren)
        .map(({ id }) => ({
          id,
          expanded: false,
        }))
        .reduce((map, item) => {
          map.set(item.id, item.expanded)
          return map
        }, new Map<string, boolean>()),
    [data],
  )

  const wrapper = useCallback((children: React.ReactNode): JSX.Element => {
    if (depth === 0) {
      return (
        <CheckboxTreeContext.Provider value={contextValue}>
          {children}
        </CheckboxTreeContext.Provider>
      )
    }
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>
  }, [])

  return wrapper(
    data.map((node) => (
      <CheckboxTreeNode<T>
        key={getId(node)}
        item={node}
        {...nodeProps}
      />
    )),
  )
}
