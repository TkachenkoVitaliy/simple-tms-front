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
    showWithoutActiveProject: true,
  },
  {
    path: () => 'projects/:projectId',
    element: <ProjectPage />,
  },
  {
    path: () => 'projects/:projectId/dashboard',
    element: <DashboardPage />,
    label: 'Главная',
    Icon: Dashboard,
    showWithoutActiveProject: false,
  },
  {
    path: () => 'projects/:projectId/tests',
    element: <TestsPage />,
    label: 'Тесты',
    Icon: Grading,
    showWithoutActiveProject: false,
    children: [
      {
        path: () => ':testCaseId',
        element: <TestCaseForm />,
        onProjectChangePattern: 'projects/:projectId/tests',
      },
    ],
  },
]
