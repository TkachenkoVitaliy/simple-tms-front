import { projectStore } from 'entities/Project/model/store/projectStore'
import { observer } from 'mobx-react-lite'

const ProjectsPage = observer(() => {
  return (
    <div style={{ minHeight: '100%', height: '100%' }}>
      <div>ProjectsPage</div>
      <div>{projectStore.activeProjectId?.toString() || 'null'}</div>
      <div>{projectStore.isLoading.toString()}</div>
    </div>
  )
})

export default ProjectsPage
