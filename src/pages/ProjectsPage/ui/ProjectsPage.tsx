import { useEffect } from 'react'

import { observer } from 'mobx-react-lite'

import { PageLoader } from 'widgets/PageLoader'

import { projectStore } from 'entities/Project'
import { ProjectCardsGrid } from 'entities/Project/ui/ProjectCardsGrid'

import { PageFrame } from 'shared/ui/PageFrame'

import styles from './ProjectsPage.module.scss'

const ProjectsPage = observer(() => {
  useEffect(() => {
    projectStore.loadProjects()
  }, [])

  if (projectStore.isLoading) {
    return <PageLoader />
  }

  return (
    <PageFrame>
      <div className={styles.container}>
        <ProjectCardsGrid />
      </div>
    </PageFrame>
  )
})

export default ProjectsPage
