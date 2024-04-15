import { CheckboxTreeNode } from 'shared/ui/CheckboxTree/CheckboxTreeNode'

export interface CheckboxTreeProps<T> {
  data: T[]
  getId: (item: T) => string | number
  getChildren: (item: T) => T[] | undefined
  depth?: number
  indent: number
  getLabel: (item: T) => string
}
export function CheckboxTree<T>(props: CheckboxTreeProps<T>) {
  const { data, ...nodeProps } = props
  const { getId, getChildren, depth = 1, indent = 36, getLabel } = nodeProps

  return data.map((node) => (
    <CheckboxTreeNode<T>
      key={getId(node)}
      item={node}
      {...nodeProps}
    />
  ))
}
