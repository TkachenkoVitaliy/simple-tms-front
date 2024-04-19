import { createContext } from 'react'

export interface CheckboxTreeContextProps {
  treeExpandState?: Map<string, boolean>
  setTreeExpandState?: (newState: Map<string, boolean>) => void
  treeCheckState?: Set<string>
  setTreeCheckState?: (newState: Set<string>) => void
}

export const CheckboxTreeContext = createContext<CheckboxTreeContextProps>({})
