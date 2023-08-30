import { Suspense, memo, useCallback } from 'react'
import { Route, RouteProps, RouterProvider, Routes } from 'react-router-dom'
import { routes } from '../model/routes'

const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: RouteProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={<Suspense fallback="loading...">{route.element}</Suspense>}
      />
    )
  }, [])

  return <Routes>{Object.values(routes).map(renderWithWrapper)}</Routes>
})

export default AppRouter
