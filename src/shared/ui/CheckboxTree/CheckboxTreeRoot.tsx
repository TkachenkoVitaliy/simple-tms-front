import { useEffect, useMemo, useState } from 'react'

import { CheckboxTree } from 'shared/ui/CheckboxTree/CheckboxTree'
import { CheckboxTreeActions } from 'shared/ui/CheckboxTree/CheckboxTreeActions'
import { CheckboxTreeContext } from 'shared/ui/CheckboxTree/CheckboxTreeContext'

export type CheckboxState = 'checked' | 'indeterminate' | 'unchecked'

export interface FlatTreeItem {
  id: string
  parentId: string | null
  childrenIds?: string[]
  checkState: CheckboxState
  expanded?: boolean
}

export interface CheckboxTreeRootProps<T> {
  data: T[]
  selected?: string[]
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
    selected = [],
    setSelected,
    forceState = 'collapsed',
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
        expanded:
          children !== undefined && children.length > 0
            ? forceState === 'expanded'
            : undefined,
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

  const contextValues = useMemo(
    () => ({
      treeCheckState: checkState,
      setTreeCheckState: setCheckState,
    }),
    [checkState, setCheckState],
  )

  function calcCheckState(
    item: FlatTreeItem,
    map: Map<string, FlatTreeItem>,
  ): CheckboxState {
    const { childrenIds } = item
    if (childrenIds !== undefined && childrenIds.length > 0) {
      const children = childrenIds.map((childId) => map.get(childId))
      const childrenCheckState = children
        .filter((child) => child !== undefined)
        .map((child) => calcCheckState(child as FlatTreeItem, map))
      if (
        childrenCheckState.every(
          (checkStateItem) => checkStateItem === 'checked',
        )
      ) {
        item.checkState = 'checked'
      } else if (
        childrenCheckState.every(
          (checkStateItem) => checkStateItem === 'unchecked',
        )
      ) {
        item.checkState = 'unchecked'
      } else {
        item.checkState = 'indeterminate'
      }
    }

    return item.checkState
  }

  useEffect(() => {
    const checkboxMap = new Map(
      mapToFlat(data, selected).map((item) => [item.id, item]),
    )
    checkboxMap.forEach((val, key) => {
      const valFromMap = checkboxMap.get(key)
      if (valFromMap !== undefined) {
        calcCheckState(valFromMap, checkboxMap)
      }
    })
    console.log('checkboxMap', checkboxMap)
    setCheckState(checkboxMap)
  }, [data, forceState])

  return (
    <CheckboxTreeContext.Provider value={contextValues}>
      <CheckboxTreeActions />
      <CheckboxTree
        {...props}
        isRoot
      />
    </CheckboxTreeContext.Provider>
  )
}
