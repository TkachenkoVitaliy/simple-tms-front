import { observer } from 'mobx-react-lite'

import { Grid } from '@mui/material'

import { projectStore } from '../../model/store/projectStore'
import { Project } from '../../model/types/project'
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
      {wrapGridItem(<NewProjectCard />, 0)}
      {projectStore.projects.map((project: Project) =>
        wrapGridItem(<ProjectCard project={project} />, project.id),
      )}
    </Grid>
  )
})
