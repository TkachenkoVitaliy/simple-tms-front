import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { createContext } from 'react'

export interface AppRoute {
  path: () => string
  element: React.ReactNode
  label?: string
  Icon?:
    | React.FC<React.SVGProps<SVGSVGElement>>
    | (OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
        muiName: string
      })
  children?: AppRoute[]
  showWithoutActiveProject?: boolean
  onProjectChangePattern?: string
  end?: boolean
}

export interface AppRouterContextProps {
  routes?: AppRoute[]
}

export const AppRouterContext = createContext<AppRouterContextProps>({})
