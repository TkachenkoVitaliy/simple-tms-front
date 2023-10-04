import { ErrorPage } from 'pages/ErrorPage'
import { Suspense, memo, useCallback } from 'react'
import {
  Navigate,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import { IAppRoute, IRoute } from 'shared/types/routerTypes'
import { AppLayout } from 'app/AppLayout'
import { projectsStore } from 'entities/Project/model/projectsStore'
import { appRoutes } from '../model/appRoutes'

const AppRouter = memo(() => {
  const mapToRoute = useCallback(
    (appRoute: IAppRoute): IRoute => {
      const { path, element, children } = appRoute
      return {
        path: path(),
        element: <Suspense fallback="loading...">{element}</Suspense>,
        children: children ? children.map(mapToRoute) : undefined,
      }
    },
    [projectsStore.activeProject],
  )

  const routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <Suspense fallback="loading...">
          <AppLayout />
        </Suspense>
      ),
      errorElement: (
        <Suspense fallback="loading...">
          <ErrorPage />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/projects" />,
        },
        ...appRoutes.map(mapToRoute),
      ],
    },
    {
      path: 'auth',
      element: <div>AuthLayout</div>,
    },
  ]

  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} />
})

export default AppRouter
