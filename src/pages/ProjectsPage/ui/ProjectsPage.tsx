import { observer } from 'mobx-react-lite'

import { ProjectCardsGrid } from 'entities/Project/ui/ProjectCardsGrid'

import { PageFrame } from 'shared/ui/PageFrame'

import styles from './ProjectsPage.module.scss'

const ProjectsPage = observer(() => {
  return (
    <PageFrame>
      <div className={styles.container}>
        <ProjectCardsGrid />
      </div>
    </PageFrame>
  )
})

export default ProjectsPage
