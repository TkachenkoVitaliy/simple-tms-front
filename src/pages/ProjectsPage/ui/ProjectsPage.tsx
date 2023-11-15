import { Container } from '@mui/material'
import { ProjectList } from 'entities/Project'
import { projectsStore } from 'entities/Project/model/projectsStore old'
import { useEffect } from 'react'

function ProjectsPage() {
  useEffect(() => {
    projectsStore.initProjects()
  }, [])

  return (
    <Container
      maxWidth={false}
      sx={{ paddingTop: '24px', paddingBottom: '24px' }}
    >
      <ProjectList />
    </Container>
  )
}

export default ProjectsPage
