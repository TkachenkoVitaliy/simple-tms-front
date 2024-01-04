import { Dashboard, Dataset, Grading } from '@mui/icons-material'
import { Navigate } from 'react-router-dom'

import { AppLayout } from 'app/layout/AppLayout'
import { AuthLayout } from 'app/layout/AuthLayout'

import { ErrorPage } from 'pages/ErrorPage'
import { ProjectPage } from 'pages/ProjectPage'
import { ProjectsPage } from 'pages/ProjectsPage'
import { TestsPage } from 'pages/TestsPage'

import { PageLoader } from 'widgets/PageLoader'

import { AppRoute } from 'shared/types/router'
import TestSuitePage from 'pages/TestSuitePage/ui/TestSuitePage'

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
        onProjectChangePattern: 'projects/:projectId',
      },
      {
        path: 'projects/:projectId',
        element: <ProjectPage />, // <ProjectPage />,
      },
      {
        path: 'projects/:projectId/dashboard',
        element: <div>DASHBOARD PAGE</div>, // <DashboardPage />,
        label: 'Главная',
        Icon: Dashboard,
        showWithoutActiveProject: false,
      },
      {
        path: 'projects/:projectId/tests',
        element: <TestsPage />,
        label: 'Тесты',
        Icon: Grading,
        showWithoutActiveProject: false,
        children: [
          {
            path: 'suite/new',
            element: <TestSuitePage isNew />, // <TestSuiteForm />,
            onProjectChangePattern: 'projects/:projectId/tests',
          },
          {
            path: 'suite/:testSuiteId',
            element: <TestSuitePage />, // <TestSuiteForm />,
            onProjectChangePattern: 'projects/:projectId/tests',
          },
          {
            path: 'case/new',
            element: <div>TEST CASE FORM</div>, // <TestCaseForm />,
            onProjectChangePattern: 'projects/:projectId/tests',
          },
          {
            path: 'case/:testCaseId',
            element: <div>TEST CASE FORM + ID</div>, // <TestCaseForm />,
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
