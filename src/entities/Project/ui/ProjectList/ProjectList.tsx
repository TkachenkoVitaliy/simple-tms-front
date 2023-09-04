import { Grid } from '@mui/material'
import { IProject, mockProjects } from 'mock/Projects'
import { memo, useEffect, useState } from 'react'
import { ProjectItem } from '../ProjectItem/ProjectItem'
import { NewProjectItem } from '../NewProjectItem/NewProjectItem'

export const ProjectList = memo(() => {
  const [projects, setProjects] = useState<IProject[]>([])
  useEffect(() => {
    setProjects(mockProjects)
  }, [mockProjects])

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        key={0}
        item
        xs={4}
      >
        <NewProjectItem />
      </Grid>
      {projects.map((project) => (
        <Grid
          key={project.id}
          item
          xs={4}
        >
          <ProjectItem project={project} />
        </Grid>
      ))}
    </Grid>
  )
})
