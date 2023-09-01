import { Container } from '@mui/material'
import { ProjectList } from 'entities/Project/ui/ProjectList/ProjectList'

function ProjectsPage() {
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
