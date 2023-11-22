import { Dashboard, Dataset, Grading } from '@mui/icons-material'
import { AppLayout } from 'app/layout/AppLayout'
import { AuthLayout } from 'app/layout/AuthLayout'
import { ErrorPage } from 'pages/ErrorPage'
import { Navigate } from 'react-router-dom'
import { AppRoute } from 'shared/types/router'

export const appRoutes: AppRoute[] = [
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/projects" />,
      },
      {
        path: 'projects',
        element: <div />, // <ProjectsPage />,
        label: 'Проекты',
        Icon: Dataset,
        showWithoutActiveProject: true,
        end: true,
      },
      {
        path: 'projects/:projectId',
        element: <div />, // <ProjectPage />,
      },
      {
        path: 'projects/:projectId/dashboard',
        element: <div />, // <DashboardPage />,
        label: 'Главная',
        Icon: Dashboard,
        showWithoutActiveProject: false,
      },
      {
        path: 'projects/:projectId/tests',
        element: <div />, // <TestsPage />,
        label: 'Тесты',
        Icon: Grading,
        showWithoutActiveProject: false,
        children: [
          {
            path: 'suite',
            element: <div />, // <TestSuiteForm />,
            onProjectChangePattern: 'projects/:projectId/tests',
          },
          {
            path: 'suite/:testSuiteId',
            element: <div />, // <TestSuiteForm />,
            onProjectChangePattern: 'projects/:projectId/tests',
          },
          {
            path: 'case',
            element: <div />, // <TestCaseForm />,
            onProjectChangePattern: 'projects/:projectId/tests',
          },
          {
            path: 'case/:testCaseId',
            element: <div />, // <TestCaseForm />,
            onProjectChangePattern: 'projects/:projectId/tests',
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
  },
]
