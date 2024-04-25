import { useEffect } from 'react'

import { CheckboxTreeNode } from './CheckboxTreeNode'
import { CheckboxTreeRootProps } from './CheckboxTreeRoot'
import { useCheckboxTreeContext } from './useCheckboxTreeContext'

export type CheckboxTreeProps<T> = Omit<
  CheckboxTreeRootProps<T>,
  'selected' | 'setSelected'
> & {
  isRoot?: boolean
}
export function CheckboxTree<T>(props: CheckboxTreeProps<T>) {
  const { data, forceState, ...nodeProps } = props
  const { getId } = nodeProps

  const [expandState, setExpandState] = useCheckboxTreeContext()

  useEffect(() => {
    if (forceState === 'expanded') {
      const newMap = new Map(expandState)
      newMap.forEach((value, key) => {
        if (value.expanded !== undefined) {
          value.expanded = true
          newMap.set(key, value)
        }
      })
      setExpandState(newMap)
    }
    if (forceState === 'collapsed') {
      const newMap = new Map(expandState)
      newMap.forEach((value, key) => {
        if (value.expanded !== undefined) {
          value.expanded = false
          newMap.set(key, value)
        }
      })
      setExpandState(newMap)
    }
  }, [forceState])

  return data.map((node) => (
    <CheckboxTreeNode<T>
      key={getId(node)}
      item={node}
      {...nodeProps}
    />
  ))
}
