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
    path: () => 'project/:projectId',
    element: <ProjectPage />,
  },
  {
    path: () => 'project/:projectId/dashboard',
    element: <DashboardPage />,
    label: 'Главная',
    Icon: Dashboard,
    showWithoutActiveProject: false,
  },
  {
    path: () => 'project/:projectId/tests',
    element: <TestsPage />,
    label: 'Тесты',
    Icon: Grading,
    showWithoutActiveProject: false,
    children: [
      {
        path: () => 'test-suite/:testSuiteId',
        element: <div>TestSuite</div>,
        onProjectChangePattern: 'project/:projectId/tests',
      },
      {
        path: () => 'test/:testCaseId',
        element: <TestCaseForm />,
        onProjectChangePattern: 'project/:projectId/tests',
      },
    ],
  },
]
