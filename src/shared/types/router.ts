import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { RouteObject } from 'react-router-dom'

import { RouteParamKeys } from 'shared/consts/routeParams'

export type AppRoute = Omit<RouteObject, 'children'> & {
  fallback?: React.ReactNode | null
  children?: AppRoute[]
  label?: string
  Icon?:
    | React.FC<React.SVGProps<SVGSVGElement>>
    | (OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
        muiName: string
      })
  showWithoutActiveProject?: boolean
  onProjectChangePattern?: string
  end?: boolean
}

export type FlatAppRoute = Omit<AppRoute, 'children'> & {
  fullPath?: string
}

export type RouteParams = Record<RouteParamKeys, string | undefined>
