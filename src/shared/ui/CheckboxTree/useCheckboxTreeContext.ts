import { useContext } from 'react'

import { CheckboxTreeContext } from 'shared/ui/CheckboxTree/CheckboxTreeContext'

export const useCheckboxTreeContext = (): [
  Map<string, boolean>,
  (newState: Map<string, boolean>) => void,
  Set<string>,
  (newState: Set<string>) => void,
] => {
  const {
    treeExpandState,
    setTreeExpandState,
    treeCheckState,
    setTreeCheckState,
  } = useContext(CheckboxTreeContext)

  if (
    treeExpandState === undefined ||
    setTreeExpandState === undefined ||
    treeCheckState === undefined ||
    setTreeCheckState === undefined
  ) {
    throw new Error('CheckboxTreeContext error')
  }

  return [
    treeExpandState,
    setTreeExpandState,
    treeCheckState,
    setTreeCheckState,
  ]
}
