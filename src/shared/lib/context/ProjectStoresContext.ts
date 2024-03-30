import { createContext } from 'react'

import { ProjectEntitiesRootStore } from 'entities/Project'

export const ProjectStoresContext =
  createContext<ProjectEntitiesRootStore | null>(null)
