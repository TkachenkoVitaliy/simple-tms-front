import { Edit } from '@mui/icons-material'
import {
  Button,
  ButtonBase,
  CardContent,
  CardHeader,
  IconButton,
  useTheme,
} from '@mui/material'
import Card from '@mui/material/Card'
import zIndex from '@mui/material/styles/zIndex'
import { IProject } from 'mock/Projects'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProjectItemProps {
  project: IProject
}

export const ProjectItem = memo(({ project }: ProjectItemProps) => {
  const { name, description } = project
  const navigate = useNavigate()
  const theme = useTheme()

  const cardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('card', e.currentTarget, e.target)
    e.preventDefault()
    e.stopPropagation()
    navigate(`${project.id}`)
  }

  const editClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('edit', e.currentTarget, e.target)
    e.preventDefault()
    e.stopPropagation()
    navigate(`${project.id}/edit`)
  }

  console.log(theme)

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
          color: theme.palette.text.primary,
        }}
        onClick={cardClick}
      >
        <CardHeader
          title={name}
          action={
            <IconButton sx={{ zIndex: 1000 }}>
              <Edit />
            </IconButton>
          }
          sx={{
            color: theme.palette.text.primary,
            height: '64px',
          }}
        />
        <CardContent
          component="div"
          sx={{ height: '130px', color: theme.palette.text.secondary }}
        >
          <div style={{ height: '70px', overflowY: 'clip' }}>{description}</div>
        </CardContent>
      </Button>
    </Card>
  )
})
