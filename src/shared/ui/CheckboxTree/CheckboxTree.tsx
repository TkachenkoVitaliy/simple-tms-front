import { CheckboxTreeNode } from 'shared/ui/CheckboxTree/CheckboxTreeNode'
import { useCheckboxTreeContext } from 'shared/ui/CheckboxTree/useCheckboxTreeContext'
import { useEffect } from 'react'

export interface CheckboxTreeProps<T> {
  data: T[]
  getId: (item: T) => string | number
  getChildren: (item: T) => T[] | undefined
  indent?: number
  getLabel: (item: T) => string
  isRoot?: boolean
  forceState?: 'expanded' | 'collapsed'
}
export function CheckboxTree<T>(props: CheckboxTreeProps<T>) {
  console.log('CheckboxTree render')
  const { data, forceState, ...nodeProps } = props
  const { getId } = nodeProps

  const [checkboxState, setCheckBoxState] = useCheckboxTreeContext()

  useEffect(() => {
    if (forceState === 'expanded') {
      const newMap = new Map(checkboxState)
      newMap.forEach((value, key) => newMap.set(key, true))
      setCheckBoxState(newMap)
      console.log(newMap)
    }
    if (forceState === 'collapsed') {
      const newMap = new Map(checkboxState)
      newMap.forEach((value, key) => newMap.set(key, false))
      setCheckBoxState(newMap)
      console.log(newMap)
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
