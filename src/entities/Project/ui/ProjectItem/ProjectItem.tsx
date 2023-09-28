import { Button, CardContent, CardHeader, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import { appStore } from 'app/store/AppStore'
import { observer } from 'mobx-react-lite'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE_ACTIVE_PROJECT } from 'shared/consts/localstorage'
import { IProject } from 'shared/types/projectTypes'

interface ProjectItemProps {
  project: IProject
}

export const ProjectItem = memo(
  observer(({ project }: ProjectItemProps) => {
    const { name, description } = project
    const theme = useTheme()
    const navigate = useNavigate()
    const borderColor = theme.palette.info.main
    const localStorageActiveProject = localStorage.getItem(
      LOCAL_STORAGE_ACTIVE_PROJECT,
    )
    if (
      project.id.toString() === localStorageActiveProject &&
      localStorageActiveProject !== appStore.activeProject?.id.toString()
    ) {
      appStore.setActiveProject(project)
    }

    const selectCard = async (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      await appStore.setActiveProject(project)
      // navigate(`../projects/${project.id}`)
    }

    const editCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      navigate(`../projects/${project.id}`)
    }

    const deleteCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      await appStore.deleteProject(project.id)
      await appStore.loadProjects()
      if (appStore.activeProject?.id === project.id) {
        appStore.setActiveProject(null)
      }
    }

    return (
      <Card
        variant="elevation"
        raised
        sx={{
          padding: project.id === appStore.activeProject?.id ? '4px' : '8px',
          border:
            project.id === appStore.activeProject?.id
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
            marginTop: '4px',
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
