import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon'

export interface IAppRoute {
  path: () => string
  element: React.ReactNode
  label?: string
  Icon?:
    | React.FC<React.SVGProps<SVGSVGElement>>
    | (OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
        muiName: string
      })
  children?: IAppRoute[]
  showWithoutActiveProject?: boolean
  onProjectChangePattern?: string
}

export interface IRoute {
  path: string
  element: React.ReactNode
  children?: IRoute[]
}

export type RouteParams = 'projectId' | 'testSuiteId' | 'testCaseId'
