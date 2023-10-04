import { ProjectForm } from 'entities/Project'
import { observer } from 'mobx-react-lite'

function ProjectPage() {
  return <ProjectForm />
}

export default observer(ProjectPage)
