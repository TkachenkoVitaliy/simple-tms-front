import { Add } from '@mui/icons-material'
import { Button, CardContent, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import { projectsStore } from 'entities/Project/model/projectsStore'
import { observer } from 'mobx-react-lite'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './NewProjectItem.module.scss'

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
        className={styles.card}
      >
        <Button
          fullWidth
          component="div"
          className={styles.btn}
          onClick={cardClick}
        >
          <CardContent
            component="div"
            className={styles.content}
          >
            <Add className={styles.add_svg} />
          </CardContent>
        </Button>
      </Card>
    )
  }),
)
