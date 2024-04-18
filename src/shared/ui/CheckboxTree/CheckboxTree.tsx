import { useEffect } from 'react'

import { CheckboxTreeNode } from './CheckboxTreeNode'
import { CheckboxTreeRootProps } from './CheckboxTreeRoot'
import { useCheckboxTreeContext } from './useCheckboxTreeContext'

export type CheckboxTreeProps<T> = CheckboxTreeRootProps<T> & {
  isRoot?: boolean
}
export function CheckboxTree<T>(props: CheckboxTreeProps<T>) {
  const { data, forceState, ...nodeProps } = props
  const { getId } = nodeProps

  const [expandState, setExpandState] = useCheckboxTreeContext()

  useEffect(() => {
    if (forceState === 'expanded') {
      const newMap = new Map(expandState)
      newMap.forEach((value, key) => newMap.set(key, true))
      setExpandState(newMap)
    }
    if (forceState === 'collapsed') {
      const newMap = new Map(expandState)
      newMap.forEach((value, key) => newMap.set(key, false))
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
