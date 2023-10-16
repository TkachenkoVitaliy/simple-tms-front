import { useContext } from 'react'
import { AppRoute, AppRouterContext } from '../context/AppRouterContext'

export function useAppRouter(): AppRoute[] {
  const { routes } = useContext(AppRouterContext)
  return routes || []
}
