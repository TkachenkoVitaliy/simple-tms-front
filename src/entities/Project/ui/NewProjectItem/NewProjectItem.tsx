import { Add } from '@mui/icons-material'
import { Button, CardContent, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import { appStore } from 'app/store/AppStore'
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
      e.stopPropagation()
      navigate('/project/0')
      appStore.setActiveProject(null)
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
            height: '206px',
            display: 'flex',
            flexDirection: 'column',
            textTransform: 'none',
            padding: '0',
            color: theme.palette.text.primary,
            borderRadius: '4px',
            border: `6px solid ${createColor}`,
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
