import { useEffect, useMemo } from 'react'

import { observer } from 'mobx-react-lite'

import { Outlet, useNavigate, useOutlet, useParams } from 'react-router-dom'

import {
  ProjectEntitiesRootStore,
  ProjectForm,
  projectStore,
} from 'entities/Project'

import { ProjectStoresContext } from 'shared/lib/context/ProjectStoresContext'
import { RouteParams } from 'shared/types/router'
import { PageFrame } from 'shared/ui/PageFrame'

import styles from './ProjectPage.module.scss'

export interface ProjectPageProps {
  isNew?: boolean
}

function ProjectPage(props: ProjectPageProps) {
  const { isNew } = props
  const params = useParams<RouteParams>()
  const outlet = useOutlet()
  const navigate = useNavigate()

  const projectId = useMemo(() => {
    if (isNew) return null
    return params.projectId ? Number(params.projectId) : null
  }, [isNew, params])

  useEffect(() => {
    projectStore.setActiveProjectId(projectId)
  }, [isNew])

  useEffect(() => {
    if (projectId !== null) {
      projectStore.loadEditableProject(projectId)
    } else {
      projectStore.setEditableProject({ ...projectStore.newProject })
    }
  }, [projectId])

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

  return outlet ? (
    <ProjectStoresContext.Provider value={projectEntitiesRootStore}>
      <Outlet />
    </ProjectStoresContext.Provider>
  ) : (
    <PageFrame>
      <ProjectForm
        className={styles.container}
        project={projectStore.editableProject}
        key={projectStore.editableProject.id}
      />
    </PageFrame>
  )
}

export default observer(ProjectPage)
