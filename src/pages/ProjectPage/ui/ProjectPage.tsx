import { projectStore } from 'entities/Project/model/store/projectStore'
import { ProjectForm } from 'entities/Project/ui/ProjectForm'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'shared/types/router'
import styles from './ProjectPage.module.scss'

export interface ProjectPageProps {
  isNew?: boolean
}

function ProjectPage(props: ProjectPageProps) {
  const { isNew } = props
  const params = useParams<RouteParams>()

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

  return (
    <ProjectForm
      className={styles.container}
      project={projectStore.editableProject}
      key={projectStore.editableProject.id}
    />
  )
}

export default observer(ProjectPage)
