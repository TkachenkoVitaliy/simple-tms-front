import {
  Dashboard,
  Dataset,
  Grading,
  Assignment,
  SmartDisplay,
} from '@mui/icons-material'
import { Navigate } from 'react-router-dom'

import { AppLayout } from 'app/layout/AppLayout'
import { AuthLayout } from 'app/layout/AuthLayout'

import { DashboardPage } from 'pages/DashboardPage'
import { ErrorPage } from 'pages/ErrorPage'
import { ProjectPage } from 'pages/ProjectPage'
import { ProjectsPage } from 'pages/ProjectsPage'
import { TestCasePage } from 'pages/TestCasePage'
import { TestPlanPage } from 'pages/TestPlanPage'
import { TestPlansPage } from 'pages/TestPlansPage'
import { TestRunExecutionPage } from 'pages/TestRunExecutionPage'
import { TestRunPage } from 'pages/TestRunPage'
import { TestRunsPage } from 'pages/TestRunsPage'
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
        element: <ProjectPage />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
            label: 'Главная',
            Icon: Dashboard,
            showWithoutActiveProject: false,
          },
          {
            path: 'plans',
            element: <TestPlansPage />,
            label: 'Планы',
            Icon: Assignment,
            showWithoutActiveProject: false,
            onProjectChangePattern: 'projects/:projectId',
          },
          {
            path: 'plans/new',
            element: <TestPlanPage isNew />,
            onProjectChangePattern: 'projects/:projectId/plans',
          },
          {
            path: 'plans/:testPlanId',
            element: <TestPlanPage />,
            onProjectChangePattern: 'projects/:projectId/plans',
          },
          {
            path: 'runs',
            element: <TestRunsPage />,
            label: 'Запуски',
            Icon: SmartDisplay,
            showWithoutActiveProject: false,
            onProjectChangePattern: 'projects/:projectId',
          },
          {
            path: 'runs/:testRunId',
            element: <TestRunPage />,
            onProjectChangePattern: 'projects/:projectId/runs',
            children: [
              {
                path: ':executedCaseId',
                element: <TestRunExecutionPage />,
                onProjectChangePattern: 'projects/:projectId/runs',
              },
            ],
          },
          {
            path: 'tests',
            element: <TestsPage />,
            label: 'Тесты',
            Icon: Grading,
            showWithoutActiveProject: false,
            children: [
              {
                path: 'suite/new',
                element: <TestSuitePage isNew />,
                onProjectChangePattern: 'projects/:projectId/tests',
              },
              {
                path: 'suite/:testSuiteId',
                element: <TestSuitePage />,
                onProjectChangePattern: 'projects/:projectId/tests',
              },
              {
                path: 'case/new',
                element: <TestCasePage isNew />,
                onProjectChangePattern: 'projects/:projectId/tests',
              },
              {
                path: 'case/:testCaseId',
                element: <TestCasePage />,
                onProjectChangePattern: 'projects/:projectId/tests',
              },
            ],
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
