import { useCallback, useContext } from 'react'

import { AppRoute, FlatAppRoute } from 'shared/types/router'

import { AppRouterContext } from '../context/AppRouterContext'

export function useFlatAppRouter(): FlatAppRoute[] {
  const { routes } = useContext(AppRouterContext)

  const flattenRoutes = useCallback(
    (routesArray: AppRoute[], parentPath?: string) => {
      let flattenedRoutes: FlatAppRoute[] = []

      routesArray.forEach((route) => {
        if (route.path !== undefined) {
          const routePath =
            parentPath !== undefined
              ? [parentPath, route.path].join('/')
              : route.path

          flattenedRoutes.push({
            // Берем свойства объекта route за исключением поля children
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ...(({ children, ...o }) => o)(route),
            fullPath: routePath,
          })

          if (route.children !== undefined && route.children.length > 0) {
            const childRoutes = flattenRoutes(route.children, routePath)
            flattenedRoutes = flattenedRoutes.concat(childRoutes)
          }
        }
      })

      return flattenedRoutes
    },
    [],
  )

  return routes ? flattenRoutes(routes) : []
}
