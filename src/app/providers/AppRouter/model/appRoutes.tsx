import { Dashboard, Dataset, Grading } from '@mui/icons-material'
import { TestCaseForm } from 'entities/TestCase/ui/TestCaseForm/TestCaseForm'
import { DashboardPage } from 'pages/DashboardPage'
import ProjectPage from 'pages/ProjectPage/ui/ProjectPage'
import { ProjectsPage } from 'pages/ProjectsPage'
import { TestsPage } from 'pages/TestsPage'
import { IAppRoute } from 'shared/types/routerTypes'

export const appRoutes: IAppRoute[] = [
  {
    path: () => 'projects',
    element: <ProjectsPage />,
    label: 'Проекты',
    Icon: Dataset,
  },
  {
    path: () => 'project/:projectId',
    element: <ProjectPage />,
  },
  {
    path: () => 'project/:projectId/dashboard',
    element: <DashboardPage />,
    label: 'Главная',
    Icon: Dashboard,
  },
  {
    path: () => 'project/:projectId/tests',
    element: <TestsPage />,
    label: 'Тесты',
    Icon: Grading,
    children: [
      {
        path: () => 'test-suite/:id',
        element: <div>TestSuite</div>,
      },
      {
        path: () => 'test/:id',
        element: <TestCaseForm />,
      },
    ],
  },
]
