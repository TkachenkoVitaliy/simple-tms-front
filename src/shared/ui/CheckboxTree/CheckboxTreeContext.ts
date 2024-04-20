import { createContext } from 'react'

import { FlatTreeItem } from 'shared/ui/CheckboxTree/CheckboxTreeRoot'

export interface CheckboxTreeContextProps {
  treeExpandState?: Map<string, boolean>
  setTreeExpandState?: (newState: Map<string, boolean>) => void
  treeCheckState?: Map<string, FlatTreeItem>
  setTreeCheckState?: (newState: Map<string, FlatTreeItem>) => void
}

export const CheckboxTreeContext = createContext<CheckboxTreeContextProps>({})
