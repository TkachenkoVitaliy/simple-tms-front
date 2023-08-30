import { Navigate, RouteProps } from 'react-router-dom'
import { AppRoutes } from '../../../../shared/consts/routes'
import DashboardPage from '../../../../pages/DashboardPage/ui/DashboardPage'
import { ProjectPage } from '../../../../pages/ProjectsPage'

export const routes: Record<AppRoutes, RouteProps> = {
  [AppRoutes.INITIAL]: {
    path: '',
    element: <Navigate to="/projects" />,
  },
  [AppRoutes.PROJECTS]: {
    path: '/projects',
    element: <ProjectPage />,
  },
  [AppRoutes.PROJECT]: {
    path: '/projects/:id',
    element: <ProjectPage />,
  },
  [AppRoutes.DASHBOARD]: {
    path: '/projects/:id/dashboard',
    element: <DashboardPage />,
  },
  [AppRoutes.TEST_RUNS]: {
    path: '/projects/:id/test-runs',
  },
  [AppRoutes.TEST_PLANS]: {
    path: '/projects/:id/test-plans',
  },
  [AppRoutes.TESTS]: {
    path: '/projects/:id/tests',
  },
}
