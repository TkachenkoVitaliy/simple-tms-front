import DashboardPage from '../../pages/DashboardPage/ui/DashboardPage'
import ShutdownIcon from '../../../../shared/assets/shutdown.svg'

export interface IAppRoutes {
  path: string
  element: React.ReactNode
  label?: string
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

export const testElem: IAppRoutes = {
  path: '/test',
  element: <DashboardPage />,
  label: 'TEST',
  Icon: ShutdownIcon,
}
