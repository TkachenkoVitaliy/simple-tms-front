import { Container } from '@mui/material'
import { appStore } from 'app/store/AppStore'
import { ProjectList } from 'entities/Project'
import { useEffect } from 'react'

function ProjectsPage() {
  useEffect(() => {
    appStore.loadProjects()
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
