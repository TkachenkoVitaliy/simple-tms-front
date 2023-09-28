import { Container } from '@mui/material'
import { appStore } from 'app/store/AppStore'
import { ProjectList } from 'entities/Project'
import { useEffect } from 'react'

function ProjectsPage() {
  useEffect(() => {
    console.log('PROJECTS PAGE USE EFFECT')
    appStore.loadProjects().then()
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
