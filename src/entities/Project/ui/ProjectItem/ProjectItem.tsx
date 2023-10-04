import { Button, CardContent, CardHeader, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import { observer } from 'mobx-react-lite'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProject } from 'shared/types/projectTypes'
import { projectsStore } from '../../model/projectsStore'

interface ProjectItemProps {
  project: IProject
}

export const ProjectItem = memo(
  observer(({ project }: ProjectItemProps) => {
    const { name, description } = project
    const theme = useTheme()
    const navigate = useNavigate()
    const borderColor = theme.palette.info.main

    const selectCard = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      projectsStore.setActiveProject(project)
    }

    const editCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      projectsStore.setActiveProject(project)
      navigate(`../projects/${project.id}`)
    }

    const deleteCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      await projectsStore.deleteProject(project.id)
      await projectsStore.initProjects()
    }

    return (
      <Card
        variant="elevation"
        raised
        sx={{
          padding:
            project.id === projectsStore.activeProject?.id ? '4px' : '8px',
          border:
            project.id === projectsStore.activeProject?.id
              ? `4px solid ${borderColor}`
              : undefined,
          borderRadius: '4px',
        }}
      >
        <Button
          fullWidth
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textTransform: 'none',
          }}
          onClick={selectCard}
        >
          <CardHeader
            title={name}
            sx={{
              color: theme.palette.text.primary,
              height: '64px',
            }}
          />
          <CardContent
            component="div"
            sx={{ height: '130px', color: theme.palette.text.secondary }}
          >
            <div
              style={{
                height: '70px',
                overflowY: 'clip',
                whiteSpace: 'pre-wrap',
              }}
            >
              {description}
            </div>
          </CardContent>
        </Button>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginTop: '8px',
          }}
        >
          <Button
            color="primary"
            variant="outlined"
            onClick={editCard}
          >
            EDIT
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={deleteCard}
          >
            DELETE
          </Button>
        </div>
      </Card>
    )
  }),
)
