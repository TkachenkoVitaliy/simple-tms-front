import { Suspense, useCallback, useMemo } from 'react'
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import { AppRouterContext } from 'shared/lib/context/AppRouterContext'
import { AppRoute } from 'shared/types/router'
import { Loader } from 'shared/ui/Loader'

export interface AppRouterProviderProps {
  routes: AppRoute[]
}

const AppRouterProvider = (props: AppRouterProviderProps) => {
  const { routes } = props

  const providerValue = useMemo(() => ({ routes }), [])

  const mapToRouteObjects = useCallback((appRoute: AppRoute): RouteObject => {
    const { path, element, children, index, errorElement } = appRoute
    return {
      path,
      element: <Suspense fallback={<Loader />}>{element}</Suspense>,
      children: children ? children.map(mapToRouteObjects) : undefined,
      index,
      errorElement: <Suspense fallback={<Loader />}>{errorElement}</Suspense>,
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

export default AppRouterProvider
