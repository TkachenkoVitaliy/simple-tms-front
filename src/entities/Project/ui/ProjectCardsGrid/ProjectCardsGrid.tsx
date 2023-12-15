import { observer } from 'mobx-react-lite'

import { Grid } from '@mui/material'

import { projectStore } from 'entities/Project/model/store/projectStore'
import { Project } from 'entities/Project/model/types/project'

import { NewProjectCard } from '../NewProjectCard'
import { ProjectCard } from '../ProjectCard/ProjectCard'

export interface ProjectCardsGridProps {}

export const ProjectCardsGrid = observer(() => {
  const wrapGridItem = (children: React.ReactNode, key: number) => (
    <Grid
      key={key}
      item
      xs={4}
    >
      {children}
    </Grid>
  )

  return (
    <Grid
      container
      spacing={2}
    >
      {projectStore.isLoading ? null : wrapGridItem(<NewProjectCard />, 0)}
      {projectStore.projects.map((project: Project) =>
        wrapGridItem(<ProjectCard project={project} />, project.id),
      )}
    </Grid>
  )
})
