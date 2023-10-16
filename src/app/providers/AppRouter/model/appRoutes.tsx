import { Dashboard, Dataset, Grading } from '@mui/icons-material'
import { TestCaseForm } from 'entities/TestNode/TestCase'
import { TestSuiteForm } from 'entities/TestNode/TestSuite/ui/TestSuiteForm'
import { DashboardPage } from 'pages/DashboardPage'
import ProjectPage from 'pages/ProjectPage/ui/ProjectPage'
import { ProjectsPage } from 'pages/ProjectsPage'
import { TestsPage } from 'pages/TestsPage'
import { AppRoute } from 'shared/lib/context/AppRouterContext'

export const appRoutes: AppRoute[] = [
  {
    path: () => 'projects',
    element: <ProjectsPage />,
    label: 'Проекты',
    Icon: Dataset,
    showWithoutActiveProject: true,
    end: true,
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
        path: () => 'suite',
        element: <TestSuiteForm />,
        onProjectChangePattern: 'projects/:projectId/tests',
      },
      {
        path: () => 'suite/:testSuiteId',
        element: <TestSuiteForm />,
        onProjectChangePattern: 'projects/:projectId/tests',
      },
      {
        path: () => 'case',
        element: <TestCaseForm />,
        onProjectChangePattern: 'projects/:projectId/tests',
      },
      {
        path: () => 'case/:testCaseId',
        element: <TestCaseForm />,
        onProjectChangePattern: 'projects/:projectId/tests',
      },
    ],
  },
]
