import { useContext } from 'react'

import { CheckboxTreeContext } from 'shared/ui/CheckboxTree/CheckboxTreeContext'
import { FlatTreeItem } from 'shared/ui/CheckboxTree/CheckboxTreeRoot'

export const useCheckboxTreeContext = (): [
  Map<string, FlatTreeItem>,
  (newState: Map<string, FlatTreeItem>) => void,
] => {
  const { treeCheckState, setTreeCheckState } = useContext(CheckboxTreeContext)

  if (treeCheckState === undefined || setTreeCheckState === undefined) {
    throw new Error('CheckboxTreeContext error')
  }

  return [treeCheckState, setTreeCheckState]
}
