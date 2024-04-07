import { useMemo } from 'react'

import { observer } from 'mobx-react-lite'

import { Outlet, useNavigate, useOutlet } from 'react-router-dom'

import { TestsTree } from 'widgets/TestsTree'

import { ProjectEntitiesRootStore, projectStore } from 'entities/Project'

import { ProjectStoresContext } from 'shared/lib/context/ProjectStoresContext'
import { PageFrame } from 'shared/ui/PageFrame'
import { ResizableWrapper } from 'shared/ui/ResizableWrapper'

function TestsPage() {
  const outlet = useOutlet()
  const navigate = useNavigate()

  const left = (
    <PageFrame>
      <TestsTree />
    </PageFrame>
  )

  const right = outlet ? (
    <PageFrame>
      <Outlet />
    </PageFrame>
  ) : null

  const projectEntitiesRootStore = useMemo(() => {
    if (projectStore.activeProjectId === null) {
      return null
    }
    return new ProjectEntitiesRootStore(projectStore.activeProjectId)
  }, [projectStore.activeProjectId])

  if (projectEntitiesRootStore === null) {
    navigate('../../')
    return null
  }

  return (
    <ProjectStoresContext.Provider value={projectEntitiesRootStore}>
      <ResizableWrapper
        firstElement={left}
        secondElement={right}
        secondElementWidth={{
          default: '50%',
          min: '42%',
          max: '80%',
        }}
      />
    </ProjectStoresContext.Provider>
  )
}

export default observer(TestsPage)
