import { useEffect, useMemo, useState } from 'react'

import { flattenArray } from 'shared/lib/utils/arrayUtil/arrayUtil'
import { CheckboxTree } from 'shared/ui/CheckboxTree/CheckboxTree'
import { CheckboxTreeContext } from 'shared/ui/CheckboxTree/CheckboxTreeContext'

export interface CheckboxTreeRootProps<T> {
  data: T[]
  getId: (item: T) => string | number
  getChildren: (item: T) => T[] | undefined
  indent?: number
  getLabel: (item: T) => string
  getIcon?: (item: T) => React.ReactNode
  forceState?: 'expanded' | 'collapsed'
}

export function CheckboxTreeRoot<T>(props: CheckboxTreeRootProps<T>) {
  const { data, getChildren, getId, forceState } = props

  const [expandState, setExpandState] = useState<Map<string, boolean>>(
    new Map(),
  )

  const contextValues = useMemo(
    () => ({
      treeExpandState: expandState,
      setTreeExpandState: setExpandState,
    }),
    [expandState, setExpandState],
  )

  const defaultExpandedState = useMemo(() => {
    return forceState === 'expanded'
  }, [forceState])

  useEffect(() => {
    const res = flattenArray(
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
        expanded: defaultExpandedState,
      }))
      .reduce((map, item) => {
        map.set(item.id, item.expanded)
        return map
      }, new Map<string, boolean>())

    setExpandState(res)
  }, [data, forceState])

  return (
    <CheckboxTreeContext.Provider value={contextValues}>
      <CheckboxTree
        {...props}
        isRoot
      />
    </CheckboxTreeContext.Provider>
  )
}
