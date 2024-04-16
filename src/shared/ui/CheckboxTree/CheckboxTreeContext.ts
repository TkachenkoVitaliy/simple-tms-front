import { createContext } from 'react'

export const CheckboxTreeContext = createContext<Map<string, boolean>>(
  new Map(),
)
