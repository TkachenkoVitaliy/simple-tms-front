import { Suspense, useCallback, useMemo } from 'react'

import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { AppRouterContext } from 'shared/lib/context/AppRouterContext'
import { AppRoute } from 'shared/types/router'
import { Spinner } from 'shared/ui/Spinner'

export interface AppRouterProviderProps {
  routes: AppRoute[]
  pageFallback?: React.ReactNode
}

export const AppRouterProvider = (props: AppRouterProviderProps) => {
  const { routes, pageFallback } = props

  const providerValue = useMemo(() => ({ routes }), [])

  const mapToRouteObjects = useCallback((appRoute: AppRoute): RouteObject => {
    const { path, element, children, index, errorElement, fallback } = appRoute

    const elementFallback = fallback === null ? null : fallback || pageFallback

    return {
      path,
      element: elementFallback ? (
        <Suspense fallback={elementFallback}>{element}</Suspense>
      ) : (
        element
      ),
      children: children ? children.map(mapToRouteObjects) : undefined,
      index,
      errorElement: errorElement ? (
        <Suspense fallback={<Spinner />}>{errorElement}</Suspense>
      ) : undefined,
    } as RouteObject // Изза ошибки
    //   Type '{ path: string | undefined; element: JSX.Element; children: RouteObject[] | undefined; index: boolean | undefined; errorElement: JSX.Element; }' is not assignable to type 'RouteObject'.
    //   Types of property 'index' are incompatible.
    //   Type 'boolean | undefined' is not assignable to type 'false | undefined'.
    //   Type 'true' is not assignable to type 'false'.ts(2322)
  }, [])

  const router = createBrowserRouter(routes.map(mapToRouteObjects))

  return (
    <AppRouterContext.Provider value={providerValue}>
      <RouterProvider router={router} />
    </AppRouterContext.Provider>
  )
}
