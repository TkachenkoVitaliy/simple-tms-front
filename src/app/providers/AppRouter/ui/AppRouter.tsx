import { ErrorPage } from 'pages/ErrorPage'
import { Suspense, memo, useCallback } from 'react'
import {
  Navigate,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import { IAppRoute } from 'shared/types/routerTypes'
import { AppLayout } from 'app/AppLayout'
import { appRoutes } from '../model/appRoutes'

const AppRouter = memo(() => {
  const mapToRoute = useCallback((appRoute: IAppRoute) => {
    const { path, element } = appRoute
    return {
      path,
      element: <Suspense fallback="loading...">{element}</Suspense>,
    }
  }, [])

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
