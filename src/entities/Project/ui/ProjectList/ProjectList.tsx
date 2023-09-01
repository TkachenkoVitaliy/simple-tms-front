import { Grid } from '@mui/material'
import { IProject, mockProjects } from 'mock/Projects'
import { memo, useEffect, useState } from 'react'
import { ProjectItem } from '../ProjectItem/ProjectItem'

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
