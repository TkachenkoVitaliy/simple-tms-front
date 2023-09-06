import { appStore } from 'app/store/AppStore'
import { ProjectForm } from 'entities/Project/ui/ProjectForm/ProjectForm'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

function ProjectPage() {
  const { id } = useParams<{ id: string }>()

  const currentProject =
    id === '0'
      ? undefined
      : appStore.projects.find((project) => project.id.toString() === id)

  return <ProjectForm project={currentProject} />
}

export default observer(ProjectPage)
