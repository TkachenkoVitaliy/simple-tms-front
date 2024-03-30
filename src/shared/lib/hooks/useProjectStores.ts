import { useContext } from 'react'

import { ProjectStoresContext } from 'shared/lib/context/ProjectStoresContext'

export const useProjectStores = () => {
  const context = useContext(ProjectStoresContext)

  if (context === null) {
    throw new Error(
      'You have forgotten to wrap your component with ProjectStoresProvider',
    )
  }
  return context
}
