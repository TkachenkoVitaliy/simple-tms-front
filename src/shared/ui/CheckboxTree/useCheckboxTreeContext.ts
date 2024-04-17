import { useContext } from 'react'

import { CheckboxTreeContext } from 'shared/ui/CheckboxTree/CheckboxTreeContext'

export const useCheckboxTreeContext = (): [
  Map<string, boolean>,
  (newState: Map<string, boolean>) => void,
] => {
  const { treeExpandState, setTreeExpandState } =
    useContext(CheckboxTreeContext)

  if (treeExpandState === undefined || setTreeExpandState === undefined) {
    throw new Error('CheckboxTreeContext error')
  }

  return [treeExpandState, setTreeExpandState]
}
