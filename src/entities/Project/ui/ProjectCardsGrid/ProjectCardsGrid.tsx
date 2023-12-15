import { Grid } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { Project } from 'entities/Project/model/types/project'
import { projectStore } from 'entities/Project/model/store/projectStore'
import { ProjectCard } from '../ProjectCard/ProjectCard'
import { NewProjectCard } from '../NewProjectCard'

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
