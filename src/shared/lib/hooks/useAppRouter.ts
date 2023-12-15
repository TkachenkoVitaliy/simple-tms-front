import { useContext } from 'react'

import { AppRoute } from 'shared/types/router'

import { AppRouterContext } from '../context/AppRouterContext'

export function useAppRouter(): AppRoute[] {
  const { routes } = useContext(AppRouterContext)
  return routes || []
}
