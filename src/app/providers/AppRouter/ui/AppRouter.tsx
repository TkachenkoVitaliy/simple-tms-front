import { ErrorPage } from 'pages/ErrorPage'
import { Suspense, memo, useCallback, useMemo } from 'react'
import {
  Navigate,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import { IAppRoute, IRoute } from 'shared/types/routerTypes'
import { AppLayout } from 'app/AppLayout'
import { projectsStore } from 'entities/Project/model/projectsStore old'
import { Loader } from 'shared/ui/Loader/Loader'
import { AppRouterContext } from 'shared/lib/context/AppRouterContext'
import { appRoutes } from '../model/appRoutes'

const AppRouter = memo(() => {
  const providerValue = useMemo(() => ({ routes: appRoutes }), [])

  const mapToRoute = useCallback(
    (appRoute: IAppRoute): IRoute => {
      const { path, element, children } = appRoute
      return {
        path: path(),
        element: <Suspense fallback={<Loader />}>{element}</Suspense>,
        children: children ? children.map(mapToRoute) : undefined,
      }
    },
    [projectsStore.activeProject],
  )

  const routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <Suspense fallback={<Loader />}>
          <AppLayout />
        </Suspense>
      ),
      errorElement: (
        <Suspense fallback={<Loader />}>
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

  return (
    <AppRouterContext.Provider value={providerValue}>
      <RouterProvider router={router} />
    </AppRouterContext.Provider>
  )
})

export default AppRouter
