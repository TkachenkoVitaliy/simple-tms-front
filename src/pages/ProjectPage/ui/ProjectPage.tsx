import { appStore } from 'app/store/AppStore'
import { ProjectForm } from 'entities/Project'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'shared/types/routerTypes'

function ProjectPage() {
  const { projectId } = useParams<RouteParams>()

  const currentProject =
    projectId === '0'
      ? undefined
      : appStore.projects.find((project) => project.id.toString() === projectId)

  return <ProjectForm project={currentProject} />
}

export default observer(ProjectPage)
