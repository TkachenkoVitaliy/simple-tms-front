import { Add } from '@mui/icons-material'
import { Button, CardContent, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import { projectsStore } from 'entities/Project/model/projectsStore'
import { observer } from 'mobx-react-lite'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

export const NewProjectItem = memo(
  observer(() => {
    const theme = useTheme()
    const navigate = useNavigate()
    const createColor = theme.palette.success.light

    const cardClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      projectsStore.setActiveProject(null)
      navigate('/projects/0')
    }

    return (
      <Card
        variant="elevation"
        raised
        sx={{
          height: '100%',
        }}
      >
        <Button
          fullWidth
          component="div"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            textTransform: 'none',
            padding: '4px',
            color: theme.palette.text.primary,
            borderRadius: '4px',
            border: `4px solid ${createColor}`,
          }}
          onClick={cardClick}
        >
          <CardContent
            component="div"
            sx={{ height: '130px', color: theme.palette.text.secondary }}
          >
            <Add style={{ height: '100%', width: '100%', fill: createColor }} />
          </CardContent>
        </Button>
      </Card>
    )
  }),
)
