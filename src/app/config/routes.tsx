import { Dashboard, Dataset, Grading } from '@mui/icons-material'
import { Navigate } from 'react-router-dom'

import { AppLayout } from 'app/layout/AppLayout'
import { AuthLayout } from 'app/layout/AuthLayout'

import { DashboardPage } from 'pages/DashboardPage'
import { ErrorPage } from 'pages/ErrorPage'
import { ProjectPage } from 'pages/ProjectPage'
import { ProjectsPage } from 'pages/ProjectsPage'
import { TestCasePage } from 'pages/TestCasePage'
import { TestPlansPage } from 'pages/TestPlansPage'
import { TestsPage } from 'pages/TestsPage'
import { TestSuitePage } from 'pages/TestSuitePage'

import { PageLoader } from 'widgets/PageLoader'

import { AppRoute } from 'shared/types/router'

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
        element: <DashboardPage />, // <DashboardPage />,
        label: 'Главная',
        Icon: Dashboard,
        showWithoutActiveProject: false,
      },
      {
        path: 'projects/:projectId/plans',
        element: <TestPlansPage />,
        label: 'Планы',
        Icon: Dashboard,
        showWithoutActiveProject: false,
        onProjectChangePattern: 'projects/:projectId',
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
            element: <TestCasePage isNew />, // <TestCaseForm />,
            onProjectChangePattern: 'projects/:projectId/tests',
          },
          {
            path: 'case/:testCaseId',
            element: <TestCasePage />, // <TestCaseForm />,
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
