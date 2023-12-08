import { Dashboard, Dataset, Grading } from '@mui/icons-material'
import { AppLayout } from 'app/layout/AppLayout'
import { AuthLayout } from 'app/layout/AuthLayout'
import { ErrorPage } from 'pages/ErrorPage'
import { ProjectPage } from 'pages/ProjectPage'
import { ProjectsPage } from 'pages/ProjectsPage'
import { Navigate } from 'react-router-dom'
import { AppRoute } from 'shared/types/router'
import { PageLoader } from 'widgets/PageLoader'

export const appRoutes: AppRoute[] = [
  {
    path: '',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    fallback: <PageLoader />,
    children: [
      {
        index: true,
        element: <Navigate to="/projects" />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
        label: 'Проекты',
        Icon: Dataset,
        showWithoutActiveProject: true,
        end: true,
      },
      {
        path: 'projects/new',
        element: <ProjectPage isNew />,
      },
      {
        path: 'projects/:projectId',
        element: <ProjectPage />, // <ProjectPage />,
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
