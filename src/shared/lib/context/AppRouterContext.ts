import { createContext } from 'react'

import { AppRoute } from 'shared/types/router'

export interface AppRouterContextProps {
  routes?: AppRoute[]
}

export const AppRouterContext = createContext<AppRouterContextProps>({})
