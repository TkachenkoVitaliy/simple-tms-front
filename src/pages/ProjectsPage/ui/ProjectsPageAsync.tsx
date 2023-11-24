import { lazy } from 'react'

export const ProjectsPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setTimeout(() => resolve(import('./ProjectsPage')), 25000)
    }),
)
