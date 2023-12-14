import { projectStore } from 'entities/Project/model/store/projectStore'
import { ProjectCard } from 'entities/Project/ui/ProjectCard'
import { observer } from 'mobx-react-lite'

const ProjectsPage = observer(() => {
  return (
    <div style={{ minHeight: '100%', height: '100%' }}>
      {projectStore.projects.map((project) => (
        <ProjectCard project={project} />
      ))}
    </div>
  )
})

export default ProjectsPage
