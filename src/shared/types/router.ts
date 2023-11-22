import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { RouteObject } from 'react-router-dom'
import { RouteParamKeys } from 'shared/consts/routeParams'

export type AppRoute = Omit<RouteObject, 'children'> & {
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

export type RouteParams = Record<RouteParamKeys, string | undefined>