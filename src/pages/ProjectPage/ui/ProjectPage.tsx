import { projectStore } from 'entities/Project/model/store/projectStore'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'shared/types/router'

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

  return (
    <div>
      Project Page - {projectId || 'null'} -{' '}
      {JSON.stringify(projectStore.activeProject)}
    </div>
  )
}

export default observer(ProjectPage)
