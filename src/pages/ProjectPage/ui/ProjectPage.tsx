import { Card } from '@mui/material'
import { projectStore } from 'entities/Project/model/store/projectStore'
import { ProjectForm } from 'entities/Project/ui/ProjectForm'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'shared/types/router'
import { TMSSkeleton } from 'shared/ui/TMSSkeleton'

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
    console.log('useEffect', JSON.stringify(projectStore.editableProject))
  }, [projectId])

  return (
    <div
      style={{
        width: '50%',
        margin: '0 auto',
      }}
    >
      <TMSSkeleton
        isLoading={projectStore.isLoading}
        width="100%"
        height="100%"
        variant="rounded"
      >
        <ProjectForm project={projectStore.editableProject} />
      </TMSSkeleton>
    </div>
  )
}

export default observer(ProjectPage)
