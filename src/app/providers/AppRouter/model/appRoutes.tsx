import { Dashboard, Dataset } from '@mui/icons-material'
import { DashboardPage } from 'pages/DashboardPage'
import ProjectPage from 'pages/ProjectPage/ui/ProjectPage'
import { ProjectsPage } from 'pages/ProjectsPage'
import { IAppRoute } from 'shared/types/routerTypes'

export const appRoutes: IAppRoute[] = [
  {
    path: () => 'projects',
    element: <ProjectsPage />,
    label: 'Проекты',
    Icon: Dataset,
  },
  {
    path: () => 'project/:id',
    element: <ProjectPage />,
  },
  {
    path: () => 'project/:id/dashboard',
    element: <DashboardPage />,
    label: 'Главная',
    Icon: Dashboard,
  },
]
