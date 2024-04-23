import { createContext } from 'react'

import { FlatTreeItem } from 'shared/ui/CheckboxTree/CheckboxTreeRoot'

export interface CheckboxTreeContextProps {
  treeCheckState?: Map<string, FlatTreeItem>
  setTreeCheckState?: (newState: Map<string, FlatTreeItem>) => void
}

export const CheckboxTreeContext = createContext<CheckboxTreeContextProps>({})
