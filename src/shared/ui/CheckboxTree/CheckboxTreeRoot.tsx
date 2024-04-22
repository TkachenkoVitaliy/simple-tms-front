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
  initialSelected?: string[]
  setSelected: (newSelected: string[]) => void
  getId: (item: T) => string
  getChildren: (item: T) => T[] | undefined
  indent?: number
  getLabel: (item: T) => string
  getIcon?: (item: T) => React.ReactNode
  forceState?: 'expanded' | 'collapsed'
}

export function CheckboxTreeRoot<T>(props: CheckboxTreeRootProps<T>) {
  const {
    data,
    getChildren,
    getId,
    initialSelected = [],
    setSelected,
    forceState,
  } = props

  const [checkState, setCheckState] = useState<Map<string, FlatTreeItem>>(
    new Map(),
  )

  function mapToFlat<R extends T>(
    treeData: R[],
    initialSelectedState: string[],
    parentId: FlatTreeItem['parentId'] = null,
  ): FlatTreeItem[] {
    const result: FlatTreeItem[] = []

    treeData.forEach((item) => {
      const id = getId(item)
      const children = getChildren(item)

      const flatItem: FlatTreeItem = {
        id,
        parentId,
        childrenIds: children !== undefined ? [] : undefined,
        checkState: initialSelectedState.includes(id) ? 'checked' : 'unchecked',
      }
      result.push(flatItem)

      if (children) {
        const childrenItems = mapToFlat(children, initialSelectedState, id)
        flatItem.childrenIds?.push(
          ...childrenItems.map((childItem) => childItem.id),
        )
        result.push(...childrenItems)
      }
    })

    return result
  }

  const [expandState, setExpandState] = useState<Map<string, boolean>>(
    new Map(),
  )

  const contextValues = useMemo(
    () => ({
      treeExpandState: expandState,
      setTreeExpandState: setExpandState,
      treeCheckState: checkState,
      setTreeCheckState: setCheckState,
    }),
    [expandState, setExpandState, checkState, setCheckState],
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

    const checkboxMap = new Map(
      mapToFlat(data, initialSelected).map((item) => [item.id, item]),
    )
    checkboxMap.forEach((val, key) => {
      const { childrenIds } = val
      const valFromMap = checkboxMap.get(key)
      if (childrenIds && childrenIds.length > 0 && valFromMap) {
        const childrenNodes = childrenIds.map((childId) =>
          checkboxMap.get(childId),
        )
        if (childrenNodes.every((node) => node?.checkState === 'checked')) {
          valFromMap.checkState = 'checked'
        } else if (
          childrenNodes.every((node) => node?.checkState === 'unchecked')
        ) {
          valFromMap.checkState = 'unchecked'
        } else {
          valFromMap.checkState = 'indeterminate'
        }
      }
    })
    setCheckState(checkboxMap)
  }, [data, forceState, initialSelected])

  return (
    <CheckboxTreeContext.Provider value={contextValues}>
      <CheckboxTree
        {...props}
        isRoot
      />
    </CheckboxTreeContext.Provider>
  )
}
