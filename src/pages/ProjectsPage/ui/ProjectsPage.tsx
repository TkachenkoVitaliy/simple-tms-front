import { ProjectCardsGrid } from 'entities/Project/ui/ProjectCardsGrid'
import { observer } from 'mobx-react-lite'
import styles from './ProjectsPage.module.scss'

const ProjectsPage = observer(() => {
  return (
    <div className={styles.container}>
      <ProjectCardsGrid />
    </div>
  )
})

export default ProjectsPage
