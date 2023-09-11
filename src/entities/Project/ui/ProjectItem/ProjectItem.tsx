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

    const cardClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      appStore.setActiveProject(project)
      navigate(`../projects/${project.id}`)
    }

    return (
      <Card
        variant="elevation"
        raised
      >
        <Button
          fullWidth
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textTransform: 'none',
            padding: project.id === appStore.activeProject?.id ? '0px' : '6px',
            color: theme.palette.text.primary,
            border:
              project.id === appStore.activeProject?.id
                ? `6px solid ${borderColor}`
                : undefined,
            borderRadius: '4px',
          }}
          onClick={cardClick}
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
      </Card>
    )
  }),
)