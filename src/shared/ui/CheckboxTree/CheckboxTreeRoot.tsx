import { useEffect, useMemo, useState } from 'react'

import { flattenArray } from 'shared/lib/utils/arrayUtil/arrayUtil'
import { CheckboxTree } from 'shared/ui/CheckboxTree/CheckboxTree'
import { CheckboxTreeContext } from 'shared/ui/CheckboxTree/CheckboxTreeContext'

export type CheckboxState = 'checked' | 'indeterminate' | 'unchecked'

export interface FlatTreeItem {
  id: string
  parentId: string | null
  childrenIds?: string[]
  checkState: CheckboxState
}

export interface CheckboxTreeRootProps<T> {
  data: T[]
  selected: Set<string>
  setSelected: (newSelected: Set<string>) => void
  getId: (item: T) => string
  getChildren: (item: T) => T[] | undefined
  indent?: number
  getLabel: (item: T) => string
  getIcon?: (item: T) => React.ReactNode
  forceState?: 'expanded' | 'collapsed'
}

export function CheckboxTreeRoot<T>(props: CheckboxTreeRootProps<T>) {
  const { data, selected, setSelected, getChildren, getId, forceState } = props

  const [expandState, setExpandState] = useState<Map<string, boolean>>(
    new Map(),
  )

  function mapToFlat<R extends T>(
    treeData: R[],
    parentId: FlatTreeItem['parentId'],
  ): FlatTreeItem[] {
    const result: FlatTreeItem[] = []

    treeData.forEach((item) => {
      const id = getId(item)
      const children = getChildren(item)

      const flatItem: FlatTreeItem = {
        id: getId(item),
        parentId,
        childrenIds:
          children !== undefined
            ? [...mapToFlat(children, id).map((i) => i.id)]
            : undefined,
        checkState: 'unchecked',
      }

      result.push(flatItem)
    })

    return result
  }

  console.log(data)

  const contextValues = useMemo(
    () => ({
      treeExpandState: expandState,
      setTreeExpandState: setExpandState,
      treeCheckState: selected,
      setTreeCheckState: setSelected,
    }),
    [expandState, setExpandState, selected, setSelected],
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
